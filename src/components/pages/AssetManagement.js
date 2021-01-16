import React, {useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';
import { addAsset, deleteAsset, updateOneAsset } from '../slices/assetSlice';

//Maps
import GoogleMapReact from 'google-map-react';

export default function AssetManagement({customerState,assetState,deviceState, assetTypeState}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    let data;

    //Get the global state
    let customersState = customerState.customers;
    let isLoading = customerState.isLoading

    let assetsState = assetState.assets;

    let assetTypesState = assetTypeState.assetTypes;
    let IsLoadingAssestTypes = assetTypeState.isLoading;

    let devicesState = deviceState.devices;

    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(assetsState));
    let customerRows = JSON.parse(JSON.stringify(customersState));
    let assetTypeRows = JSON.parse(JSON.stringify(assetTypesState));

    //On page load and other
    useEffect(()=>{
        
    },[customersState, assetsState, assetTypesState, devicesState]);//only rerender if the admins change

    //*****************Asset Registration*******************


    //-------------Asset Registrations---------------
    //Local states
    const [asset_type_id, setAssetTypeId] = useState('');
    const [asset_name, setAssetName] = useState('');
    const [asset_description, setAssetDescription] = useState('');
    const [customer_id, setCustomerId] = useState('');

    //OnChange handlers
    const onAssetTypeIdChange = e => setAssetTypeId(e.target.value);
    const onAssetNameChange = e => setAssetName(e.target.value);
    const onAssetDescriptionChange = e => setAssetDescription(e.target.value);
    const onCustomerIdChange = e => setCustomerId(e.target.value);

    //-------------Asset Update----------------
    const [asset_type_idModal, setAssetTypeIdModal] = useState('');
    const [asset_nameModal, setAssetNameModal] = useState('');
    const [asset_descriptionModal, setAssetDescriptionModal] = useState('');
    const [customer_idModal, setCustomerIdModal] = useState('');

    //onChange handlers
    const onAssetTypeIdChangeModal = e => setAssetTypeIdModal(e.target.value);
    const onAssetNameChangeModal = e => setAssetNameModal(e.target.value);
    const onAssetDescriptionChangeModal = e => setAssetDescriptionModal(e.target.value);
    const onCustomerIdChangeModal = e => setCustomerIdModal(e.target.value);

    //set the center of the map - Centre is set to the center of South Africa
    const center = {
        lat: -28.4792625,
        lng: 24.6727135
    };
    //How far in to zoom
    const zoom = 6;

    //google api key
    const GoogleMapAPIKey= 'AIzaSyCAOP2cEf7DWpGCIJeRo8ds8V1JwKnHQas';//'AIzaSyA5N9f2NrFQbQwtXVVBmmWldkhJ40U03Vg';

    //state to hold the live devices (we want their live packet data)
    const [liveDevices, setLiveDevices] = useState();

    //Truck icon to be displayed
    const [truckIcon, setTruckIcon] = useState();

    //for all the columns in the payload
    const [columns, setColumns] = useState([]);

    //Array to put the columns
    var columnsArray = [];

    //data packet payload
    const [payload, setPayload] = useState([]);

    //***********Functions************ */

    //Register Asset Function
    let registerAsset = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Asset?',
            text: 'Are you sure you want to register the asset?',
            showCancelButton: true,
            confirmButtonText: `Register Asset`,
          }).then((result) => {
            if (result.isConfirmed) {
              
                //Send the api request
                api.post('/assets', {
                    asset_type_id,
                    asset_name,
                    asset_description,
                    customer_id,
                }).then( function(response){

                    //Dispatch to update the state
                    dispatch(
                        addAsset({
                            asset_id: response.data.data.asset_id,
                            asset_type_id,
                            asset_name,
                            asset_description,
                            deleted: response.data.data.deleted,
                            customer_id
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Asset Reg: User (ID: ${user.user_id}) registered an asset with name ${asset_name} (ID: ${response.data.data.asset_id}).`;
                    api.post('/systemlog',{
                        user_id: user.user_id,
                        entry_content})
                    .then()
                    .catch(error =>{
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
                    //***************SYSTEM LOG********************* */
                    //********************************************** */

                    //Trigger the swal
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: `Asset has been added with name: ${response.data.data.asset_name}`
                    });

                    //Clear all the inputs
                    setAssetTypeId('');
                    setAssetName('');
                    setAssetDescription('');
                    setCustomerId('');

                }).catch(function(error){
                    if(error.response && error.response.data){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${error.response.data.error}`
                        });
                    }
                });
              
            } else if (result.isDismissed) {

              Swal.fire('Asset was not registered.', '', 'info')
            }
          }).catch(function(error){
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: `${error}`
            });
        });
    }

    //View Asset details
    let viewAssetDetails = (e) =>{
        
        //Get the asset id
        var assetId = parseInt(e.target.getAttribute('data-id'));
        if(assetId !== null)
        {
            //Adjust the update button data-id of the button 
            document.getElementById('btnUpdateAsset').setAttribute('data-id', assetId);
        }

        //find all the devices that contain this asset it and put them in an array
        let dataRows = JSON.parse(JSON.stringify(devicesState));

        let deviceHtml = ``;
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
            document.getElementById('customerIDModal').value = response.data.data.customer_id;
            document.getElementById('deviceIdModal').innerHTML = deviceHtml;
            document.getElementById('assetDescriptionModal').value = response.data.data.asset_description;

            //update the state
            setAssetNameModal(response.data.data.asset_name);
            setAssetTypeIdModal(response.data.data.asset_type_id);
            setCustomerIdModal(response.data.data.customer_id);
            setAssetDescriptionModal(response.data.data.asset_description);

        });
    }

    //
    let circleColour;

    //Function to view the live data of assets
    let viewLiveData = (e) =>{

        //Get the asset id
        var assetId = parseInt(e.target.getAttribute('data-id'));
        
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
                
                //loop through all the assets dataRows(assets)
                for(var k = 0; k <dataRows.length; k++ ){
        
                    if(dataRows[k]['asset_id']===assetDevices[i]['asset_id'] ){
                        assetDevices[i]['asset_id'] = (
                            <div>
                                <a type='button' data-id={assetDevices[i]['device_id']} onClick={viewPacketData} href>
                                    {circleColour}{dataRows[k]['asset_name']} Device {k}
                                </a>
                            </div>
                        );
                    }
                }
                
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
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Serial Number',
            field: 'asset_name',
            sort: 'asc',
          },
          
        ],
        rows: liveDevices
    };

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

            //get the device that has just been clicked on
            const deviceClicked = devicesState.find(device => device.device_id === parseInt(deviceId));

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

                //set the columns
                setColumns(columnsArray);

                //Change the colour of the trucks for the map
                if(deviceClicked.device_status.includes("IN USE")) setTruckIcon(<i class='fa fa-truck fa-2x text-success' lat={array[0]} lng={array[1]} />)
                if(deviceClicked.device_status.includes("BEING REPAIRED")) setTruckIcon(<i class='fa fa-truck fa-2x text-warning' lat={array[0]} lng={array[1]} />)
                if(deviceClicked.device_status.includes("DECOMMISSIONED")) setTruckIcon(<i class='fa fa-truck fa-2x text-danger' lat={array[0]} lng={array[1]} />)
                
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

    //Update Asset Function
    let updateAsset = (e) => {
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Get the asset id
        var assetId = parseInt(document.getElementById('btnUpdateAsset').getAttribute('data-id'));

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Asset?',
            text: 'Are you sure you want to update the asset?',
            showCancelButton: true,
            confirmButtonText: `Update Asset`,
          }).then( (result) => {

                if (result.isConfirmed) {
              
                    //Send the api request
                    api.put(`/assets/${assetId}`,{
                        asset_type_id: asset_type_idModal,
                        asset_name: asset_nameModal,
                        asset_description: asset_descriptionModal,
                        customer_id: customer_idModal
                    }).then( function (response) {

                        //dispatch to update the state
                        dispatch(
                            updateOneAsset({
                                asset_id: assetId,
                                asset_type_id: asset_type_idModal,
                                asset_name: asset_nameModal,
                                asset_description: asset_descriptionModal ,
                                customer_id: customer_idModal
                            })
                        )

                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Asset Update: User (ID: ${user.user_id}) edited an asset with name ${asset_nameModal} (ID '${assetId}).`;
                        api.post('/systemlog',{
                            user_id: user.user_id,
                            entry_content})
                        .then()
                        .catch(error =>{
                            if(error.response && error.response.data){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: `${error.response.data.error}`
                                });
                            }
                        });
                        //***************SYSTEM LOG********************* */
                        //********************************************** */

                        //Trigger the swal
                        Swal.fire({
                            icon: 'success',
                            title: 'Saved!',
                            text: `${response.data.message}`
                        });

                        //Just change the id to the alias
                        //get the state again
                        dataRows = JSON.parse(JSON.stringify(assetsState));

                        const existingAsset = dataRows.find(asset => asset.asset_id ===assetId);

                        //loop through all the customers
                        for(var k = 0; k <customerRows.length; k++ ){

                            if(existingAsset.customer_id===customerRows[k]['customer_id'] )
                            {
                                existingAsset.customer_id = customerRows[k]['customer_name'];
                            }
                                
                        }

                        //clear all the input fields
                        setAssetTypeIdModal('');
                        setAssetNameModal('');
                        setAssetDescriptionModal('');
                        setCustomerIdModal('');

                        //Close the modal
                        document.getElementById('assetDetailsModal').click();

                        
                    }).catch(function(error){
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
         
                }
            })
    }

    //Update Asset Function
    let deleteOneAsset = (e) => {
        //Prevent form from submitting to the actual file
        //e.preventDefault();

         //Get the asset id
         var assetId = parseInt(e.target.getAttribute('data-id'));

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Delete Asset?',
            text: 'Are you sure you want to delete the asset?',
            showCancelButton: true,
            confirmButtonText: `Delete`,
          }).then( (result) => {

                if (result.isConfirmed) {
              
                    //Send the api request
                    api.delete(`/assets/${assetId}`)
                    .then( function (response) {
                        //dispatch to update the state
                        dispatch(
                            deleteAsset({
                                asset_id: assetId
                            })
                        )

                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Asset Delete: User (ID: ${user.user_id}) deleted an asset with name ${response.data.asset_name} (ID: ${assetId}).`;
                        api.post('/systemlog',{
                            user_id: user.user_id,
                            entry_content})
                        .then()
                        .catch(error =>{
                            if(error.response && error.response.data){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: `${error.response.data.error}`
                                });
                            }
                        });
                        //***************SYSTEM LOG********************* */
                        //********************************************** */

                        //Trigger the swal
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `${response.data.message}`
                        });

                    }).catch(function(error){
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
         
                }
            })
    }
    

        
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
                <button  type="button" class="btn btn-success btn-sm" onClick={viewAssetDetails} data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#assetDetailsModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details 
                </button>{' '}
                <button  type="button" class="btn btn-primary btn-sm" onClick={viewLiveData} data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#liveDataModal">
                    <i class="fas fa-globe-africa fa-sm fa-fw mr-2 text-gray-400"></i>
                    Live Data 
                </button>{' '}
                <button  type="button" class="btn btn-danger btn-sm" onClick={deleteOneAsset} data-id={dataRows[i]['asset_id']} >
                    <i class="fas fa-trash fa-sm fa-fw mr-2 "></i>
                    Delete
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
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Asset</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Assets</a>
                        </li>
                        
                    </ul>

                
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Asset</h3>
                            <br/>
                            <form method='post' onSubmit={registerAsset}>
                                <div class="row register-form">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Asset Name</label>
                                                    <input required='required' type="text" class="form-control" id="assetName" 
                                                     name="assetName" placeholder="Asset Name *" 
                                                     value={asset_name}
                                                     onChange={onAssetNameChange}/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Asset Type</label>
                                                    {!IsLoadingAssestTypes ? (
                                                        <select required='required' class='form-control' id='assetTypeId' 
                                                         name='assetTypeId'
                                                         value={asset_type_id}
                                                         onChange={onAssetTypeIdChange}>
                                                            <option hidden selected >Please choose an asset type.</option>
                                                            {assetTypesState.map(assetType => <option value={assetType.type_id} >{assetType.type_alias}</option>)}
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
                                                    <label class='label'>Customer Name</label>
                                                    {!isLoading ? (
                                                        <select required='required' class='form-control' id='customerID' 
                                                         name='customerID'
                                                         value={customer_id}
                                                         onChange={onCustomerIdChange}>
                                                            <option hidden selected>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
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
                                                    <label class='label'>Asset Description</label>
                                                    <textarea required='required' rows='4' type="text" class="form-control" 
                                                     id="assetDescription" name="assetDescription" placeholder="Asset Description *" 
                                                     value={asset_description}
                                                     onChange={onAssetDescriptionChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/><br/>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-3"></div>
                                    <div class="col-md-7"><br/>
                                        <div class='row'>
                                            <button type='submit' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Register Asset</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br/> <br/>
                        </div>

                        <div class="tab-pane fade show" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                            <br/>
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
                        <form method='post' onSubmit={updateAsset}>
                            <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Asset Name</label>
                                                <input required='required' type="text" class="form-control" id="assetNameModal" 
                                                 name="assetNameModal" placeholder="Asset Name *" 
                                                 value={asset_nameModal}
                                                 onChange={onAssetNameChangeModal} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                {!IsLoadingAssestTypes ? (
                                                        <select required='required' class='form-control' id='assetTypeIdModal'
                                                         name='assetTypeIdModal'
                                                         value={asset_type_idModal}
                                                         onChange={onAssetTypeIdChangeModal}>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {assetTypesState.map(assetType => <option value={assetType.type_id} >{assetType.type_alias}</option>)}
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
                                                <label class='label'>Customer Name</label>
                                                {!isLoading ? (
                                                        <select required='required' class='form-control' id='customerIDModal' 
                                                         name='customerIDModal'
                                                         value={customer_idModal}
                                                         onChange={onCustomerIdChangeModal}>
                                                            <option hidden selected disabled>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
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
                                                <div id='deviceIdModal'>

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
                                                <textarea rows='4' type="text" class="form-control" id="assetDescriptionModal" 
                                                 name="assetDescriptionModal" placeholder="Asset Description *"
                                                 value={asset_descriptionModal} 
                                                 onChange={onAssetDescriptionChangeModal} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                <div class="col-md-2"></div>
                                <div class="col-md-3"></div>
                                <div class="col-md-7"><br/>
                                    <div className='row'>
                                        <button type='submit' data-id='0' id='btnUpdateAsset' class="btn btn-success btn-icon-split">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text">Save Changes</span>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </form>
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
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: GoogleMapAPIKey }}
                                        defaultCenter={center}
                                        defaultZoom={zoom}>

                                        {truckIcon}

                                    </GoogleMapReact>
                                </div>
                                <div class='col-md-6'>
                                    <div class="table-responsive">
                                        <MDBDataTable size="sm" striped bordered data={liveData} />
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
