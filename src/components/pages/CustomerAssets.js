import React, {useState} from 'react'
import { Redirect} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

//Swal
import Swal from 'sweetalert2'

//global fetches
import {useSelector} from 'react-redux';

//api import
import api from '../../api/api';

//Maps
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";

export default function CustomerAssets({customerState,assetState,deviceState, assetTypeState}) {

    let data;

    let IsLoadingAssestTypes = assetTypeState.isLoading;

    //set the center of the map - Centre is set to the center of South Africa
    const center = {
        lat: -28.4792625,
        lng: 24.6727135
    };
    //How far in to zoom
    const zoom = 6;

    //google api key
    //const GoogleMapAPIKey= 'AIzaSyCAOP2cEf7DWpGCIJeRo8ds8V1JwKnHQas';//'AIzaSyA5N9f2NrFQbQwtXVVBmmWldkhJ40U03Vg';

    //state to hold the live devices (we want their live packet data)
    const [liveDevices, setLiveDevices] = useState();

    //Truck icon to be displayed
    //const [truckIcon, setTruckIcon] = useState();

    //for all the columns in the payload
    const [columns, setColumns] = useState([]);

    //Latest waypoints
    const [latestWaypoints, setLatestWaypoints] = useState([]);

    //truck location
    const [truckLocation, setTruckLocation] = useState({});

    //Array to put the columns
    var columnsArray = [];

    //data packet payload
    const [payload, setPayload] = useState([]);

    const user = useSelector(state => state.user.user);
    //if the company id is not there
    if(user.user_company_id ===undefined){
        return <Redirect to='/' />
    }

    //loop through the assets and return those thaat belong to the session company
    const customerAssets = assetState.assets.filter(asset => asset.customer_id === user.user_company_id);

    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(customerAssets));
    let customerRows = JSON.parse(JSON.stringify(customerState.customers));
    let assetTypeRows = JSON.parse(JSON.stringify(assetTypeState.assetTypes));

    let devicesState = deviceState.devices;

    
    //Function to view customer assets
    let viewAssetDetails = (e) =>{
        
        //Get the asset id
        var assetId = parseInt(e.target.getAttribute('data-id'));

        //find all the devices that contain this asset it and put them in an array
        let dataRows = JSON.parse(JSON.stringify(deviceState.devices));

        let deviceHtml = ``;

        if(isNaN(assetId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            for(var k =  0; k < dataRows.length;k++){
            
                if(dataRows[k]['asset_id'] === assetId)
                    deviceHtml += `<p><i class='fa fa-cog'></i> Packet Structure: ${dataRows[k]['device_pac']}.  Sigfox Id: ${dataRows[k]['sigfox_id']} </p>`;
            }

            //Send the axios request
            api.get('/assets/'+assetId)
            .then(response => {
                //populate the html elements accordingly
                document.getElementById('assetNameModal').value = response.data.data.asset_name;
                document.getElementById('assetTypeIdModal').value = response.data.data.asset_type_id;
                document.getElementById('deviceIdModal').innerHTML = deviceHtml;
                document.getElementById('assetDescriptionModal').value = response.data.data.asset_description;

            });

        }

    }

    //
    let circleColour;

    //Function to view the live data of assets
    let viewLiveData = (e) =>{

        //Get the asset id
        var assetId = parseInt(e.target.getAttribute('data-id'));

        //Remove the marker
        setTruckLocation({
            lat: 0,
            lng: 0
        });

        //remove the path drawn
        setLatestWaypoints([]);
        
        if(isNaN(assetId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            //find all the devices that contain this asset it and put them in an array
            let stateDevices = JSON.parse(JSON.stringify(devicesState));
            let assetDevices = stateDevices.filter(device => device.asset_id === assetId);

            for(var i = 0; i< assetDevices.length; i++){

                //Change the colour of the circles according to device states
                if(assetDevices[i]['device_status'].includes("IN USE")) circleColour = <i class="fas fa-circle text-success"></i>
                else if(assetDevices[i]['device_status'].includes("BEING REPAIRED")) circleColour = <i class="fas fa-circle text-warning"></i>
                else if(assetDevices[i]['device_status'].includes("DECOMMISSIONED")) circleColour = <i class="fas fa-circle text-danger"></i>
                
                assetDevices[i]['device_name'] = (
                    <div>
                        <a type='button' data-id={assetDevices[i]['device_id']} onClick={viewPacketData} href>
                            {circleColour}{assetDevices[i]['device_name']}
                        </a>
                    </div>
                );

                //Make the device serial number a button
                assetDevices[i]['device_serial'] = (
                    <div>
                        <a type='button' data-id={assetDevices[i]['device_id']} onClick={viewPacketData} href>
                            {assetDevices[i]['device_serial']}
                        </a>
                    </div>
                );
            
                
                
            }
            //Update the state
            setLiveDevices(assetDevices);

        }

    }

    //Live devices data table details
    let liveData = {

        columns: [
          {
            label: 'Device Name',
            field: 'device_name',
            sort: 'asc',
          },
          {
            label: 'Serial Number',
            field: 'device_serial',
            sort: 'asc',
          },
          
        ],
        rows: liveDevices
    };

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={center}
        >
            
            <Polyline 
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 4
                }}
                path={latestWaypoints}
            />

            <Marker 
                position={truckLocation} 
                label={""}
            > 
            </Marker>
        </GoogleMap>
    ));

    //Function to populate the packet data table
    let viewPacketData = (e) => { 

        //Get the asset id
        var deviceId = parseInt(e.target.getAttribute('data-id'));
        
        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            let tempData = [];
            let latestRecordIndex;
            let latestWaypointsCount;

            //get the device that has just been clicked on
            //const deviceClicked = devicesState.find(device => device.device_id === parseInt(deviceId));

            //Remove the marker
            setTruckLocation({
                lat: 0,
                lng: 0
            });

            //remove the path drawn
            setLatestWaypoints([]);

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

                //Check if there are GPS Coordinates coming through
                if(!tempData[latestRecordIndex]['GPS']){
                    Swal.fire({
                        icon: 'warning',
                        title: 'No GPS Coordinates',
                        text: `The device did not send GPS coordinates the latest time it sent data.`
                    });

                    //Remove the marker
                    setTruckLocation({
                        lat: 0,
                        lng: 0
                    });

                    //remove the path drawn
                    setLatestWaypoints([]);

                }

                //set the columns
                setColumns(columnsArray);

                //Change the colour of the trucks for the map
                //if(deviceClicked.device_status.includes("ACTIVE")) setTruckIcon(<i class='fa fa-truck fa-2x text-success' lat={array[0]} lng={array[1]} />)
                //if(deviceClicked.device_status.includes("REPAIRING")) setTruckIcon(<i class='fa fa-truck fa-2x text-warning' lat={array[0]} lng={array[1]} />)
                //if(deviceClicked.device_status.includes("DECOMMISSIONED")) setTruckIcon(<i class='fa fa-truck fa-2x text-danger' lat={array[0]} lng={array[1]} />)
                //if(deviceClicked.device_status.includes("IDLE")) setTruckIcon(<i class='fa fa-truck fa-2x text-default' lat={array[0]} lng={array[1]} />)
                

                //Set the current truck location
                setTruckLocation({
                    lat: parseFloat(array[0]),
                    lng: parseFloat(array[1])
                });

                //Now draw the waypoints of the the latest 8
                latestWaypointsCount = 8;
                let stringCoords;
                let tempArray = [];
                var j = 0;

                //loop through the latest waypoints count (8 of them)
                for(j; j < latestWaypointsCount; j++){
                    
                    stringCoords = tempData[j]['GPS'].toString().split(',',2);
                    tempArray.push(
                        {
                            lat:parseFloat(stringCoords[0]), 
                            lng:parseFloat(stringCoords[1])
                        }

                    );
                }
                setLatestWaypoints(tempArray);
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
    }

    //Populate the datatable with all the device data packets
    let devicePacketData = {

        columns,
        rows: payload
    };


    data = {

        columns: [
          {
            label: 'Asset ID',
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Asset Name',
            field: 'asset_name',
            sort: 'asc',
          },
          {
            label: 'Customer Name',
            field: 'customer_id',
            sort: 'asc',
          },
          {
            label: 'Asset Type',
            field: 'asset_type_id',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: dataRows
      };

    //Add the action column
    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //Replace the customer id with the customer name

        //loop through all the customers
        for(var k = 0; k <customerRows.length; k++ ){

            if(customerRows[k]['customer_id']===dataRows[i]['customer_id'] )
                dataRows[i]['customer_id'] = customerRows[k]['customer_name'];
            
        }

        //loop through all the asset types
        for(var j = 0; j <assetTypeRows.length; j++ ){

            if(assetTypeRows[j]['type_id']===dataRows[i]['asset_type_id'] )
                dataRows[i]['asset_type_id'] = assetTypeRows[j]['type_alias'];
            
        }

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button type="button" class="btn btn-success btn-sm" onClick={viewAssetDetails} data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#assetDetailsModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details
                </button>{' '}
                <button  type="button" class="btn btn-primary btn-sm" onClick={viewLiveData} data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#liveDataModal">
                    <i class="fas fa-globe-africa fa-sm fa-fw mr-2 text-gray-400"></i>
                    Live Data 
                </button>
            </div>
        )
    }


    data = {

        columns: [
          {
            label: 'Asset ID',
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Asset Name',
            field: 'asset_name',
            sort: 'asc',
          },
          {
            label: 'Customer Name',
            field: 'customer_id',
            sort: 'asc',
          },
          {
            label: 'Asset Type',
            field: 'asset_type_id',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: dataRows
      };
    
    return (

        <React.Fragment>

            <div class="row">

                <div class="col-md-12 ">
                    

                    <h3  class="register-heading">Manage Assets</h3>
                    <br/>
                    
                    {/*<!-- DataTales Example -->*/}
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">All Assets</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <MDBDataTable striped bordered data={data} />
                            </div>
                        </div>
                    </div>
                            
                    
                </div>
            </div>

            {/* Asset Details Modal */}
            <div class="modal fade" id="assetDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Asset Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Asset Name</label>
                                                <input readOnly='readonly' type="text" class="form-control" id="assetNameModal" 
                                                 name="assetNameModal" placeholder="Asset Name *"  />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                {!IsLoadingAssestTypes ? (
                                                        
                                                        <select readOnly='readonly' class='form-control' id='assetTypeIdModal'
                                                         name='assetTypeIdModal'>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {assetTypeState.assetTypes.map(assetType => <option value={assetType.type_id} >{assetType.type_alias}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device(s) Attached</label>
                                                <div readOnly='readonly' id='deviceIdModal'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Description</label>
                                                <textarea readOnly='readonly' rows='4' type="text" class="form-control" id="assetDescriptionModal" 
                                                 name="assetDescriptionModal" placeholder="Asset Description *"
                                                 ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                
                                
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
            </div>
        </div>
        {/* End Asset Details Modal */}

        {/* Live Data Modal */}
        <div class="modal fade" id="liveDataModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Live Asset Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class='col-md-12'>
                            <div class='row'>
                                <div class='col-md-6'>
                                    <MyMapComponent
                                        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCAOP2cEf7DWpGCIJeRo8ds8V1JwKnHQas&v=3.exp&libraries=geometry,drawing,places'
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `100%` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                    >
                                    </MyMapComponent>
                                </div>
                                <div class='col-md-6'>
                                    <div class="table-responsive">
                                        <MDBDataTable size="sm" striped bordered data={liveData} />
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
                            </div><br/><br/>
                            <div class='row'>
                                <div class="table-responsive">
                                    <MDBDataTable striped bordered data={devicePacketData} />
                                </div>        
                            </div>
                        </div>

                    </div>
                    
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        {/* End Live Data Modal */}

    </React.Fragment>
    )
}
