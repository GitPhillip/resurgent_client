import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { MDBDataTable } from 'mdbreact';

//Maps
import GoogleMapReact from 'google-map-react';

//api
import api from '../../api/api';

//Swal
import Swal from 'sweetalert2';

export default function Dashboard() {

    //Get the global states
    const customers = useSelector(state => state.customers.customers); 
    const assets = useSelector(state => state.assets.assets);
    const devices = useSelector(state => state.devices.devices);
    const user = useSelector(state => state.user.user);

    //get the global state count
    const customerCount = customers.length;
    const assetCount = assets.length;
    const deviceCount = devices.length;

    
    //*******************Local states***********************

    //Local state for all the active users
    const [activeUsersCount, setActiveUsersCount] = useState([]);

    //set the center of the map - Centre is set to the center of South Africa
    const center = {
        lat: -28.4792625,
        lng: 24.6727135
    };
    //How far in to zoom
    const zoom = 6;

    //google api key
    const GoogleMapAPIKey= 'AIzaSyCAOP2cEf7DWpGCIJeRo8ds8V1JwKnHQas';//'AIzaSyA5N9f2NrFQbQwtXVVBmmWldkhJ40U03Vg';

    //data packet payload
    const [payload, setPayload] = useState([]);

    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(devices));
    //Make sure we get all devices that are not assigned
    dataRows = dataRows.filter(device => device.device_status !=="IDLE")
    let assetsData = JSON.parse(JSON.stringify(assets));

    //Truck icon to be displayed
    const [truckIcon, setTruckIcon] = useState();

    //for all the columns in the payload
    const [columns, setColumns] = useState([]);

    //Array to put the device packet data columns
    var columnsArray = [];

    useEffect(() => {
       
        //Send the api request to get all users
        api.get(`/users`)
        .then(response =>{

            //Temp array
            let tempArray = [];

            //push all active users into the array
            for(var i =0; i< response.data.data.length;i++){
                if(response.data.data[i].isActive===true)
                    tempArray.push(response.data.data[i]);
            }
            //set the active users count
            setActiveUsersCount(tempArray.length);
            //set the center and the 

        })
        .catch(error =>{
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });

    }, [activeUsersCount]);
      
    //***********Function to view device details**************
    let viewDeviceDetails = (e) => {

        //Get the device ID
        let deviceId = e.target.getAttribute('data-id');
        let tempData = [];
        let latestRecordIndex;

        //get the device that has just been clicked on
        const deviceClicked = devices.find(device => device.device_id === parseInt(deviceId));

        //Clear the map
        setTruckIcon(<i class='fa fa-truck fa-2x text-default' lat={0} lng={0} />)

        //Send the API request to get the device packet data
        api.get(`/datapackets/device/${deviceId}`)
        .then(response =>{

            //Populate the device packet data rows
            for(var i = 0; i< response.data.data.length; i++){
                //Parse each object as a JSON object
                tempData.push(JSON.parse(response.data.data[i].payload));

                //replace the true/false with a string
                if(tempData[i]['MPPT_Load_Current']===false) tempData[i]['MPPT_Load_Current'] = 'No';
                else tempData[i]['MPPT_Load_Current'] = 'True';

                //Add the date of each payload to the actual payload for the device
                tempData[i]['packet_date'] = response.data.data[i].packet_date.substring(0,16);

                //Check if there are GPS Coordinates coming through
                if(!tempData[i]['GPS']){
                    Swal.fire({
                        icon: 'warning',
                        title: 'No GPS Coordinates',
                        text: `The device did not send GPS coordinates the latest time it sent data.`
                    });
                }

            }
            //Set the data to the local state payload
            setPayload(tempData); 

            latestRecordIndex = 0;
            let array;
            Object.keys(tempData[latestRecordIndex]).forEach(key =>{
                //put the keys in an array
                columnsArray.push({
                    label: key,
                    field: key,
                    sort: 'asc'
                });

                //Check if the GPS Coordinate key is there
                if(key==='GPS'){
                    array = tempData[latestRecordIndex][key].toString().split(',');
                }
            });

            //set the columns
            setColumns(columnsArray);

            //Change the colour of the trucks for the map
            if(deviceClicked.device_status.includes("ACTIVE")) setTruckIcon(<i class='fa fa-truck fa-2x text-success' lat={array[0]} lng={array[1]} />)
            if(deviceClicked.device_status.includes("REPAIRING")) setTruckIcon(<i class='fa fa-truck fa-2x text-warning' lat={array[0]} lng={array[1]} />)
            if(deviceClicked.device_status.includes("DECOMMISSIONED")) setTruckIcon(<i class='fa fa-truck fa-2x text-danger' lat={array[0]} lng={array[1]} />)
            if(deviceClicked.device_status.includes("IDLE")) setTruckIcon(<i class='fa fa-truck fa-2x text-default' lat={array[0]} lng={array[1]} />)
            
        })
        .catch(error =>{
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        })

    }
    //***********Function to view device details**************

    //Populate the datatable with all the device data packets
    let devicePacketData = {

        columns,
        rows: payload
    };
    
    //**************Handle devices data table****************
    let circleColour;
    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //Change the colour of the circles
        if(dataRows[i]['device_status'].includes("ACTIVE")) circleColour = <i class="fas fa-circle text-success"></i>
        else if(dataRows[i]['device_status'].includes("REPAIRING")) circleColour = <i class="fas fa-circle text-warning"></i>
        else if(dataRows[i]['device_status'].includes("DECOMMISSIONED")) circleColour = <i class="fas fa-circle text-danger"></i>
        else if(dataRows[i]['device_status'].includes("IDLE")) circleColour = <i class="fas fa-circle text-default"></i>

        //loop through all the device types
        for(var k = 0; k <assetsData.length; k++ ){

            //Change the asset id to the name
            if(assetsData[k]['asset_id']===dataRows[i]['asset_id'] ){
                dataRows[i]['asset_id'] = (
                    <div>
                        <a type='button' data-id={dataRows[i]['device_id']} onClick={viewDeviceDetails} href>
                            {circleColour}{assetsData[k]['asset_name']}
                        </a>
                    </div>
                );
            }

        }

        //Make the device serial number a button
        dataRows[i]['device_serial'] = (
            <div>
                <a type='button' data-id={dataRows[i]['device_id']} onClick={viewDeviceDetails} href>
                    {dataRows[i]['device_serial']}
                </a>
            </div>
        );
        
    }

    let dataDevice = {

        columns: [
          {
            label: 'Asset Name',
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Serial Number',
            field: 'device_serial',
            sort: 'asc',
          },
          
        ],
        rows: dataRows
      };

      //Prepare the relevent links
      let assetManagementRoute = `/${user.user_type.toLowerCase()}/asset_management`;
      let deviceManagementRoute = `/${user.user_type.toLowerCase()}/device_management`;
      let customerManagementRoute = `/${user.user_type.toLowerCase()}/customers`;
      let userManagementRoute = `/${user.user_type.toLowerCase()}/user_management`;

    
    //***********Function to Render**************
    return (

            //<!-- Begin Page Content -->
            <React.Fragment>

                {/*<!-- Page Heading -->*/}
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                    {user.user_type === 'ADMIN' ?

                        (
                            /*<!-- Content Row -->*/
                            <div class="row">
                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <Link to={assetManagementRoute}>
                                        <div class="card border-left-primary shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Assets</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{assetCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-truck fa-2x  text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <Link to={deviceManagementRoute}>
                                        <div class="card border-left-info shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                            Devices </div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{deviceCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-tablet-alt fa-2x  text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <Link to={customerManagementRoute}>
                                        <div class="card border-left-warning shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Customers
                                                        </div>
                                                        <div class="h5 mb-0 font-weight-bold  text-gray-800">{customerCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-handshake fa-2x text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/*<!-- Pending Requests Card Example -->*/}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <Link to={userManagementRoute}>
                                        <div class="card border-left-success shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Online Users</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{activeUsersCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-users fa-2x  text-gray-800 "></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )

                        :

                        (
                            /*<!-- Content Row -->*/
                            <div class="row">
                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-4 col-md-4 mb-4">
                                    <Link to={assetManagementRoute}>
                                        <div class="card border-left-primary shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Assets</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{assetCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-truck fa-2x  text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-4 col-md-4 mb-4">
                                    <Link to={deviceManagementRoute}>
                                        <div class="card border-left-info shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                            Devices </div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{deviceCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-tablet-alt fa-2x  text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/*<!-- Earnings (Monthly) Card Example -->*/}
                                <div class="col-xl-4 col-md-4 mb-4">
                                    <Link to='#'>
                                        <div class="card border-left-warning shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Customers
                                                        </div>
                                                        <div class="h5 mb-0 font-weight-bold  text-gray-800">{customerCount}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-handshake fa-2x text-gray-800"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        )
                    }


                {/*<!--  <!-- Content Row --> -->*/}

                <div class="row">

                    {/*<!--  AreLink Chart -->*/}
                    <div class="col-xl-7 col-lg-6">
                        <div class="card shadow mb-4">
                            {/*<!-- Card Header - Dropdown -->*/}
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Map</h6>
                                
                            </div>
                            {/*<!--Card Body -->*/}
                            <div class="card-body">
                                <div class="chart-area">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: GoogleMapAPIKey }}
                                        defaultCenter={center}
                                        defaultZoom={zoom}>

                                        {truckIcon}


                                    </GoogleMapReact>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Pie Chart -->*/}
                    <div class="col-xl-5 col-lg-6">
                        <div class="card shadow mb-4">
                            {/*<!--  Card Header - Dropdown -->*/}
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Devices</h6>
                                
                            </div>
                            {/*<!-- Card Body -->*/}
                            <div class="card-body">
                                <div class="chart-pie bg-light " style={scrollCSS}>
                                    <MDBDataTable hover striped bordered  data={dataDevice}/>
                                    
                                </div>
                                <div class="mt-4 text-center small">
                                    <span class="mr-2">
                                        <i class="fas fa-circle text-success"></i> Active
                                    </span>
                                    <span class="mr-2">
                                        <i class="fas fa-circle text-warning"></i> Repairing
                                    </span>
                                    <span class="mr-2">
                                        <i class="fas fa-circle text-danger"></i> Decommissioned
                                    </span>
                                    <span class="mr-2">
                                        <i class="fas fa-circle text-default"></i> Idle
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    
                    <div class="col-xl-12 col-lg-12">
                        {/*<!-- DataTales Example -->*/}
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Device Packet Data</h6>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <MDBDataTable striped bordered data={devicePacketData}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>
    )
    
}


const scrollCSS = {
    WebkitOverflowScrolling:"touch",
    overflowY:"scroll",
    align: 'auto',
    textAlign: 'left'
}