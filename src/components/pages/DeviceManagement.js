import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'
import api from '../../api/api';

//Reducer
import { addDevice, updateDevice, deleteDevice } from '../slices/deviceSlice';

export default function DeviceManagement({customerState,assetState,deviceState,deviceTypeState}) {

    //Get the global user
    const user = useSelector(state => state.user.user);

    //Dispatch instance
    const dispatch = useDispatch();
    
    let data;

    //Get the global state
    let customersState = customerState.customers;

    let assetsState = assetState.assets;
    let isAssetLoading = assetState.isLoading;

    let devicesState = deviceState.devices;

    let deviceTypesState = deviceTypeState.deviceTypes;
    let isDeviceTypesLoading = deviceTypeState.isLoading;

    //data packet payload and the columns for the payload
    const [payloadAndColumns, setPayloadAndColumns] = useState({
        payload: [],
        columns: []
    });

    //Array to put the device packet data columns
    var columnsArray = [];

    //The asset id of the asset that must be attached to the chosen device
    const [attachAssetId, setAttachAsset] = useState('');

    //onChange handler
    const onAttachAssetChange = e => setAttachAsset(e.target.value);

    //Local states for the inputs
    const [device_name, setDeviceName] = useState('');
    const [device_serial, setDeviceSerial] = useState('');
    const [device_type_id, setDeviceTypeId] = useState('');
    const [asset_id, setAssetId] = useState('');
    const [device_status, setDeviceStatus] = useState('');
    const [sigfox_id, setSigfoxId] = useState('');
    const [device_pac, setDevicePac] = useState('');
    const [is_prototype, setIsPrototype] = useState('');
    const [product_certificate, setProductCertificate] = useState({
        key: ''
    });
    
    //onChange handlers
    const onDeviceNameChange = e => setDeviceName(e.target.value);
    const onDeviceSerialChange = e => setDeviceSerial(e.target.value);
    const onDeviceTypeIdChange = e => setDeviceTypeId(e.target.value);
    const onAssetIdChange = e =>{ 
                                    //Handle the No Asset case
                                    //if value is No Asset
                                    if(e.target.value==='NOT ASSIGNED'){
                                        //Set the device Status
                                        setDeviceStatus('IDLE');
                                        //Make device Status readonly
                                        document.getElementById("deviceStatus").setAttribute("readOnly", true);
                                        //Set the asset_id to null
                                        setAssetId(null);
                                    }else{
                                        //Make device Status !readonly
                                        document.getElementById("deviceStatus").removeAttribute("readonly");
                                        //Take the asset value as it is
                                        setAssetId(e.target.value);
                                    }
                                        
                                }
    const onDeviceStatusChange = e =>{
                                        //Check if the asset is not assigned
                                        if(asset_id===null || asset_id==='NOT ASSIGNED'){
                                            //Make device Status readonly
                                            document.getElementById("deviceStatus").setAttribute("readOnly", true);
                                            
                                        }else{
                                            //Set the state to target value
                                            setDeviceStatus(e.target.value);
                                        }
                                    
                                    }
    const onSigfoxIdChange = e => setSigfoxId(e.target.value);
    const onDevicePacChange = e => setDevicePac(e.target.value);
    const onIsPrototypeChange = e =>{
                                        //Handle the is prototype cases
                                        //if it is a prototype, we don't require a product certificate
                                        if(e.target.value === 'true'){

                                            //Make device prod certificate readonly
                                            document.getElementById("productCertificate").setAttribute("readOnly", true);

                                            //Set the state to the target value
                                            setIsPrototype(true);

                                            //Set the prod cert state to empty
                                            setProductCertificate({key: '' });

                                        }
                                        //If it is not a prototype, we need a product certificate
                                        else if(e.target.value === 'false'){

                                            //Make device Status !readonly
                                            document.getElementById("productCertificate").removeAttribute("readOnly");

                                            //Set the state to the target value
                                            setIsPrototype(false);
                                        }
                                    }
                                    
    const onProductCertificateChange = e =>{
                                                //cross check the is_prototype state
                                                if(is_prototype===false || is_prototype==='false'){
                                                    setProductCertificate({
                                                        key: e.target.value
                                                    });
                                                }else{
                                                    setProductCertificate({
                                                        key: null
                                                    });
                                                }
                                                
                                            }

    //Modal input local states
    const [device_nameModal, setDeviceNameModal] = useState('');
    const [device_serialModal, setDeviceSerialModal] = useState('');
    const [device_type_idModal, setDeviceTypeIdModal] = useState('');
    const [asset_idModal, setAssetIdModal] = useState('');
    const [device_statusModal, setDeviceStatusModal] = useState('');
    const [sigfox_idModal, setSigfoxIdModal] = useState('');
    const [device_pacModal, setDevicePacModal] = useState('');
    const [is_prototypeModal, setIsPrototypeModal] = useState('');
    const [product_certificateModal, setProductCertificateModal] = useState({
        key: ''
    });

    //Modal onChange handlers
    const onDeviceNameChangeModal = e => setDeviceNameModal(e.target.value);
    const onDeviceSerialChangeModal = e => setDeviceSerialModal(e.target.value);
    const onDeviceTypeIdChangeModal = e => setDeviceTypeIdModal(e.target.value);
    const onAssetIdChangeModal = e =>{ 
                                    //Handle the No Asset case
                                    //if value is No Asset
                                    if(e.target.value ==='NOT ASSIGNED'){
                                        //Set the device Status
                                        setDeviceStatusModal('IDLE');
                                        //Make device Status readonly
                                        document.getElementById("deviceStatusModal").setAttribute("readOnly", true);
                                        //Set the asset_id to null
                                        setAssetIdModal(null);
                                    }else{
                                        //Make device Status !readonly
                                        document.getElementById("deviceStatusModal").removeAttribute("readonly");
                                        //Take the asset value as it is
                                        setAssetIdModal(e.target.value);
                                    }
                                        
                                }
    const onDeviceStatusChangeModal = e =>{
                                        //Check if the asset is not assigned
                                        if(asset_idModal===null || asset_idModal==='NOT ASSIGNED'){
                                            //Make device Status readonly
                                            document.getElementById("deviceStatusModal").setAttribute("readOnly", true);
                                            
                                        }else{
                                            //Set the state to target value
                                            setDeviceStatusModal(e.target.value);
                                        }
                                    
                                    }
    const onSigfoxIdChangeModal = e => setSigfoxIdModal(e.target.value);
    const onDevicePacChangeModal = e => setDevicePacModal(e.target.value);
    const onIsPrototypeChangeModal = e =>{
                                        //Handle the is prototype cases
                                        //if it is a prototype, we don't require a product certificate
                                        if(e.target.value === 'true'){

                                            //Make device prod certificate readonly
                                            document.getElementById("productCertificateModal").setAttribute("readOnly", true);

                                            //Set the state to the target value
                                            setIsPrototypeModal(true);

                                            //Set the prod cert state to empty
                                            setProductCertificateModal({key: '' });

                                        }
                                        //If it is not a prototype, we need a product certificate
                                        else if(e.target.value === 'false'){

                                            //Make device Status !readonly
                                            document.getElementById("productCertificateModal").removeAttribute("readOnly");

                                            //Set the state to the target value
                                            setIsPrototypeModal(false);
                                        }
                                    }
                                    
    const onProductCertificateChangeModal = e =>{
                                                //cross check the is_prototype state
                                                if(is_prototype===false || is_prototype==='false'){
                                                    setProductCertificateModal({
                                                        key: e.target.value
                                                    });
                                                }else{
                                                    setProductCertificateModal({
                                                        key: null
                                                    });
                                                }
                                                
                                            }
 

    //***********Functions************* */

    //Register Device Function
    let registerDevice = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        // prepare parameters to be passed
        let params;

        //Check if it is a prototype or not
        if(is_prototype===true){ //meaning product certificate is not required

            //Check if  the device has an asset attached to it
            if(asset_id!== "NOT ASSIGNED"){

                params = {
                    device_name,
                    device_serial,
                    device_type_id,
                    asset_id,
                    device_status,
                    device_pac,
                    sigfox_id,
                    is_prototype,
                }
            }else{
                params = {
                    device_name,
                    device_serial,
                    device_type_id,
                    device_status,
                    device_pac,
                    sigfox_id,
                    is_prototype,
                }
            }

        }else{//false meaning prod certificate is required

            //Check if the device is assigned to an asset
            if(asset_id !== "NOT ASSIGNED"){
                params = {
                    device_name,
                    device_serial,
                    device_type_id,
                    asset_id,
                    device_status,
                    device_pac,
                    sigfox_id,
                    is_prototype,
                    product_certificate
                }
            }else{
                params = {
                    device_name,
                    device_serial,
                    device_type_id,
                    device_status,
                    device_pac,
                    sigfox_id,
                    is_prototype,
                    product_certificate
                }
            }
        }

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Device?',
            text: 'Are you sure you want to register the device?',
            showCancelButton: true,
            confirmButtonText: `Register`,
          }).then((result) => {

            if (result.isConfirmed) {
              
                //Send the API Request
                api.post('/devices', params)
                .then( function(response){

                    //Dispatch to update the state
                    dispatch(
                        addDevice({
                            device_name,
                            device_serial,
                            device_type_id,
                            asset_id,
                            device_status,
                            device_pac,
                            sigfox_id,
                            is_prototype,
                            product_certificate,
                            deleted: 0
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Device Reg: User (ID: ${user.user_id}) registered a device with name ${device_name} (ID: ${response.data.data.device_id}).`;
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
                        text: `Device has been added with name: ${response.data.data.device_name}`
                    });

                    //Clear all the inputs
                    setDeviceName('');
                    setDeviceSerial('');
                    setDeviceTypeId('');
                    setAssetId('');
                    setDeviceStatus('');
                    setDevicePac('');
                    setSigfoxId('');
                    setIsPrototype('');
                    setProductCertificate('');

                }).catch(function(error){
                    if(error.response && error.response.data){

                        //Handle the array
                        if(error.response.data.error.length>1){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error.errors.message}`
                            });
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                        
                    }
                });
            } 

          });
    }

    //View Device Details Function
    let viewDeviceDetails = (e) =>{
        //Prevent form from submitting to the actual file
        //Get the device id
        var deviceId = e.target.getAttribute('data-id');

        let tempData = [];
        let latestRecordIndex;

        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            //Adjust the update button data-id of the button 
            document.getElementById('btnUpdateDevice').setAttribute('data-id', deviceId);

            let assetId;
            let deviceHistory;
            let strDeviceHistory = "";

            //*******Device History ***********/
            //Send the axios request
            api.get('/devicehistory/device/'+deviceId)
            .then(response =>{
                deviceHistory = response.data.data;
                deviceHistory.map(history =>{
                return strDeviceHistory += history.entry_content +'\n';
                })
                document.getElementById('deviceHistoryModal').value = strDeviceHistory;
            });
            //******* End Device History ***********/
            
            //*******Device Details ***********/
            //Send the axios request
            api.get('/devices/'+deviceId)
            .then(response => {
                //populate the html elements accordingly
                document.getElementById('deviceNameModal').value = response.data.data.device_name;
                document.getElementById('deviceSerialModal').value = response.data.data.device_serial;
                document.getElementById('deviceTypeIdModal').value = response.data.data.device_type_id;
                document.getElementById('assetIdModal').value =  response.data.data.asset_id;
                document.getElementById('devicePacModal').value = response.data.data.device_pac;
                document.getElementById('sigfoxIDModal').value = response.data.data.sigfox_id;
                document.getElementById('isPrototypeModal').value = response.data.data.is_prototype;
                document.getElementById('productCertificateModal').value = response.data.data.product_certificate;
                document.getElementById('deviceStatusModal').value = response.data.data.device_status;
                
                //Handle the packet data
                //document.getElementById('packetDataModal').value = response.data.data.device_pac;

                //Sort out the customer name and device match
                assetId = response.data.data.asset_id;
                customersState.map(customer => { 

                    assetsState.map(asset =>{
                        if(asset.asset_id ===assetId)
                        {
                            if(asset.customer_id === customer.customer_id){
                            document.getElementById('customerIdModal').value = customer.customer_name;
                            }
                        }return 'success'
                    })
                    return 'success'
                })
            });
            //******* End Device Details ***********/

            //*******Device Data Packets  ***********/
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
                
                latestRecordIndex = 0;
                Object.keys(tempData[latestRecordIndex]).forEach(key =>{
                    //put the keys in an array
                    columnsArray.push({
                        label: key,
                        field: key,
                        sort: 'asc'
                    });
                });

                //Set the data to the local state payload
                setPayloadAndColumns({
                    payload: tempData,
                    columns: columnsArray
                }); 

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
            //*******Device Data Packets  ***********/

        }
        //End else statement
       
    }

    //Populate the datatable with all the device data packets
    let devicePacketData = {

        columns: payloadAndColumns.columns,
        rows: payloadAndColumns.payload
    };


    //Update Device Function
    let updateOneDevice = (e) =>{

        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Need to get the device to be updated
        var deviceId = parseInt(document.getElementById('btnUpdateDevice').getAttribute('data-id'));

        //Check if the device Id is a number
        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{
            //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Device?',
            text: 'Are you sure you want to update the device?',
            showCancelButton: true,
            confirmButtonText: `Update`,
          }).then((result) => {
            if (result.isConfirmed) {
              
                // prepare parameters to be passed
                let params;
                //Check if it is a prototype or not
                if(is_prototype===true){ //meaning product certificate is not required
                    params = {
                        device_nameModal,
                        device_serialModal,
                        is_prototypeModal,
                    }
                }else{//false meaning prod certificate is required
                    params = {
                        device_nameModal,
                        device_serialModal,
                        is_prototypeModal,
                        product_certificateModal
                    }
                }

                //send the api request to update
                api.put(`/devices/${deviceId}`, params)
                .then(response =>{

                    //Update the state
                    dispatch(
                        updateDevice({
                            device_id: deviceId,
                            device_name: device_nameModal,
                            device_serial: device_serialModal,
                            is_prototype: is_prototypeModal,
                            product_certificate: product_certificateModal
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Device Update: User (ID: ${user.user_id}) updated a device with name ${device_nameModal} (ID: ${response.data.data.device_id}).`;
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

                    //clear all the input fields
                    setDeviceNameModal('');
                    setDeviceSerialModal('');
                    setDeviceTypeIdModal('');
                    setDevicePacModal('');
                    setSigfoxIdModal('');
                    setIsPrototypeModal('');
                    setProductCertificateModal('');
                    setDeviceStatusModal('');


                    //Close the modal
                    document.getElementById('deviceModal').click();
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

            } 
          });
        }
        //End the else
    }

    //Delete Device Function
    let deleteOneDevice = (e) =>{
        
        //Get the device id
        var deviceId = parseInt(e.target.getAttribute('data-id'));

        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{
            //Trigger the SWAL
            Swal.fire({
                icon: 'question',
                title: 'Delete Device?',
                text: 'Are you sure you want to delete the device?',
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                if (result.isConfirmed) {
                
                    //send the api .get('/customers')
                    api.delete(`/devices/${deviceId}`)
                    .then(response =>{

                        //Update the state
                        dispatch(
                            deleteDevice({
                                device_id: deviceId
                            })
                        )

                        //Log the action
                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Device Delete: User (ID: ${user.user_id}) delete a device with name (ID: ${response.data.data.device_id}).`;
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
                    
                } 
            });
        }

    }

    //Change the device status
    let changeDeviceStatus = (e) => {
        
        //Get the device id
        var deviceId = parseInt(e.target.getAttribute('data-id'));

        var deviceStatus = e.target.value;

        //get the device device Status
        if(deviceStatus === null || deviceStatus === undefined){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }
        //Check if the device Id is a number
        else if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            //Trigger the SWAL
            Swal.fire({
                icon: 'question',
                title: 'Change Device Status?',
                text: 'Are you sure you want to change the device status?',
                showCancelButton: true,
                confirmButtonText: `Yes`,
            }).then((result) => {
                if (result.isConfirmed) {

                    //Get the device 
                    const deviceLogged =devicesState.find(device => device.device_id === deviceId);
                
                    let route = '';
                    let logStatus = '';
                    //Have a switch case for the device status
                    switch(deviceStatus){

                        //We will omit this as in this case we will need it to be attached to an asset
                        case 'ACTIVE':
                            
                            break;
                        
                        case 'REPAIRING':
                            route = 'repair';
                            logStatus = 'REPAIRING';
                            break;

                        case 'DECOMMISSIONED':
                            route = 'decommission';
                            logStatus = 'DECOMMISSIONED'
                            break;

                        case 'IDLE':
                            route = 'detach';
                            logStatus = 'IDLE'
                            break;

                        default: 
                            Swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: `Something went wrong.`
                            });

                    }

                    //Send the api request
                    api.put(`/devices/${route}/${deviceId}`)
                    .then( response =>{

                        //Update the state
                        dispatch(
                            updateDevice({
                                device_id: deviceId,
                                device_status: logStatus,
                                asset_id: null
                            })
                        )

                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Device Status Change: User (ID: ${user.user_id}) changed the status of the device with name ${deviceLogged.device_name} (ID: ${deviceLogged.device_id}) to ${logStatus}.`;
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
                    

                } 
            });
        }
    }
    // End Change the device status

    let viewAssetsToAttach = (e) =>{

        //Get the device id
        var deviceId = e.target.getAttribute('data-id');

        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops..',
                text: `Something went wrong. Please try again.`
            });
        }
        else{
             //Adjust the update button data-id of the button 
             document.getElementById('btnDeviceAttachAsset').setAttribute('data-id', deviceId);
        }
    }

    //Attach the device to a asset 
    let attachAsset = (e) => {

        //Prevent the form from just submitting
        e.preventDefault();

        //Get the device id
        var deviceId  = parseInt(document.getElementById('btnDeviceAttachAsset').getAttribute('data-id'));

        //check if the device id is a valid number
        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops..',
                text: `Something went wrong. Please try again.`
            });
        }else{

            //Just check if the asset Id is fine
            if(isNaN(attachAssetId) || attachAssetId===''){
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops..',
                    text: `We could not get the asset you are looking for. Please select an asset from the list below`
                });
            }else{

                //Get the asset and device involved

                const assetLogged = assetsState.find(asset => asset.asset_id === parseInt(attachAssetId));
                //Get the device 
                const deviceLogged =devicesState.find(device => device.device_id === deviceId);

                //Send the api request to update the device
                api.put(`/devices/${deviceId}/attach/${attachAssetId}`)
                .then( response =>{

                    //Dispatch to update the state
                    dispatch(
                        updateDevice({
                            device_id: deviceId,
                            asset_id: attachAssetId,
                            device_status: 'ACTIVE'
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Device Asset Attach: User (ID: ${user.user_id}) attached the device with name ${deviceLogged.device_name} (ID: ${deviceLogged.device_id}) to ${assetLogged.asset_name} (ID: ${assetLogged.asset_id}).`;
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

                    //Set the states back to nothing
                    setAttachAsset('');
 
                    //close the modal attachAsset
                    document.getElementById('attachAssetModal').click();

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
            }
            
        }

    }

    let dataRows = JSON.parse(JSON.stringify(devicesState));
    let deviceTypeRows = JSON.parse(JSON.stringify(deviceTypesState));

    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //loop through all the device types
        for(var k = 0; k <deviceTypeRows.length; k++ ){

            if(deviceTypeRows[k]['type_id']===dataRows[i]['device_type_id'] )
                dataRows[i]['device_type_id'] = deviceTypeRows[k]['type_alias'];
            
        }

        //Handle the IDLE device
        if(dataRows[i]['device_status'] === "IDLE")
        {
            //append the action key value pair to the end of each object
            dataRows[i]['action'] = (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-id={dataRows[i].device_id} onClick={viewDeviceDetails} data-toggle="modal" data-target="#deviceModal">
                            <i class="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                            Details
                    </button>{' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-id={dataRows[i].device_id} data-toggle="modal" data-target="#attachAssetModal" onClick={viewAssetsToAttach} title='Attach the device to an asset'>
                            <i class="fas fa-plus fa-sm fa-fw mr-2"></i>
                            Attach
                    </button>{' '}
                    <button  type="button" class="btn btn-danger btn-sm" data-id={dataRows[i].device_id} onClick={deleteOneDevice}>
                            <i class="fas fa-trash fa-sm fa-fw mr-2"></i>
                            Delete
                    </button>
                </div>
            )
        }
        else{

            //append the action key value pair to the end of each object
            dataRows[i]['action'] = (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-id={dataRows[i].device_id} onClick={viewDeviceDetails} data-toggle="modal" data-target="#deviceModal">
                            <i class="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                            Details
                    </button>{' '}
                    <button  type="button" class="btn btn-danger btn-sm" data-id={dataRows[i].device_id} onClick={deleteOneDevice}>
                            <i class="fas fa-trash fa-sm fa-fw mr-2"></i>
                            Delete
                    </button>
                </div>
            )
        }

        //Change the device status display
        //append the action key value pair to the end of each object
        dataRows[i]['device_status'] = (
            <select class='form-control' id='tableDeviceStatus' name='tableDeviceStatus' data-id={dataRows[i].device_id} 
             value={dataRows[i]['device_status']} 
             onChange={changeDeviceStatus}>
                <option disabled value='ACTIVE' title='You will need to attach the device to an asset for it to be ACTIVE'>Active</option>
                <option value='REPAIRING'>Repairing</option>
                <option value='DECOMMISSIONED'>Decommissioned</option>
                <option value='IDLE'>Idle</option>
            </select>
        )
        
    }

    data = {

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
          {
            label: 'Device Type Alias',
            field: 'device_type_id',
            sort: 'asc',
          },
          {
            label: 'Device Status',
            field: 'device_status',
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
                            <a class="nav-link active" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Devices</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Device</a>
                        </li>
                        
                        
                    </ul>

                    <div class="tab-content" id="myTabContent">

                        <div class="tab-pane fade show active" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                            <br/>
                            <h3  class="register-heading">Manage Devices</h3>
                            <br/>
                            
                            {/*<!-- DataTales Example -->*/}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">All Devices</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                         <MDBDataTable striped bordered data={data} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="tab-pane fade show" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Device</h3>
                            <br/>
                            <form method='post' onSubmit={registerDevice}>
                                
                                <div class="row register-form">

                                    <div class="col-md-12">

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Device Name</label>
                                                    <input class='form-control' id='deviceName' required='required'
                                                     name='deviceName' placeholder='Device Name*'
                                                     value={device_name}
                                                     onChange={onDeviceNameChange}
                                                     />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Device Serial Number</label>
                                                    <input class='form-control' id='deviceSerial' required='required'
                                                     name='deviceSerial' placeholder='Device Serial Number*'
                                                     value={device_serial}
                                                     onChange={onDeviceSerialChange}
                                                     />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Device Type</label>
                                                    {!isDeviceTypesLoading ? (
                                                        <select required='required' class='form-control' id='deviceTypeId'
                                                         name='deviceTypeId'
                                                         value={device_type_id}
                                                         onChange={onDeviceTypeIdChange}>
                                                            <option selected hidden>Please choose a device type.</option>
                                                            {deviceTypesState.map(deviceType => <option value={deviceType.type_id} >{deviceType.type_alias}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Device Asset</label>
                                                    {!isAssetLoading ? (
                                                        <select required='required' class='form-control'
                                                         value={asset_id}
                                                         onChange={onAssetIdChange}>
                                                            <option hidden selected >Please choose an asset.</option>
                                                            <option title='If not assigned, device status will be idle' >NOT ASSIGNED</option>
                                                            {assetsState.map(asset => <option value={asset.asset_id} >{asset.asset_name}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Device PAC</label>
                                                    <input class='form-control' id='devicePac' required='required'
                                                     name='devicePac' placeholder='Device PAC*'
                                                     value={device_pac}
                                                     onChange={onDevicePacChange}
                                                     />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Sigfox Id</label>
                                                    <input class='form-control' id='sigfoxId' required='required'
                                                     name='sigfoxId' placeholder='Sigfox Id*'
                                                     value={sigfox_id}
                                                     onChange={onSigfoxIdChange}
                                                     />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Is this a prototype?</label>
                                                    <select class='form-control' required='required' id='isPrototype' name='isPrototype' 
                                                     value={is_prototype}
                                                     onChange={onIsPrototypeChange}>
                                                        <option selected hidden >Please choose an answer.</option>
                                                        <option value={'false'} title="This device will require a product certificate">No</option>
                                                        <option value={'true'} title="This device won't require a product certificate">Yes</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Product Certificate</label>
                                                    <input class='form-control' id='productCertificate'
                                                     name='productCertificate' placeholder='Product Certificate'
                                                     value={product_certificate.key}
                                                     onChange={onProductCertificateChange}
                                                     />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Device Status</label>
                                                    <select class='form-control' required='required' id='deviceStatus' name='deviceStatus'
                                                     value={device_status}
                                                     onChange={onDeviceStatusChange}>
                                                        <option hidden selected>Please choose a device status.</option>
                                                        <option value='ACTIVE'>Active</option>
                                                        <option value='REPAIRING'>Repairing</option>
                                                        <option value='DECOMMISSIONED'>Decommissioned</option>
                                                        <option value='IDLE'>Idle</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Customer Name</label>
                                                    {!isLoading ? (
                                                        <select required='required' class='form-control' id='customerId' name='customerId'>
                                                            <option hidden selected disabled>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                                </div>
                                            </div>
                                        </div>*/}

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
                                                    <span class="text">Register Device</span>
                                            </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </form>
                            <br/> <br/>
                        </div>

                    </div>
                </div>

            </div>

            {/* Device Details Modal */}
            <div class="modal fade" id="deviceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Device Details</h5>
                        
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <form method='post' onSubmit={updateOneDevice}>

                                <div id="deviceCarousel" class="carousel slide" data-interval="false">

                                    <ol class="carousel-indicators">
                                        <li data-target="#deviceCarousel" data-slide-to="0" class="active"></li>
                                        <li data-target="#deviceCarousel" data-slide-to="1"></li>
                                        <li data-target="#deviceCarousel" data-slide-to="2"></li>
                                    </ol>

                                    <div class="carousel-inner">
                        
                                        <div class="carousel-item active">

                                            <div class="col-md-12">

                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Device Name</label>
                                                            <input type="text" required='required' class="form-control" id="deviceNameModal" 
                                                             name="deviceNameModal" placeholder="Device Name *" 
                                                             value={device_nameModal}
                                                             onChange={onDeviceNameChangeModal}/>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class='label'>Device Serial Number</label>
                                                            <input type="text" required='required' class='form-control' id='deviceSerialModal' 
                                                             name='deviceSerialModal' placeholder='Device Serial Number'
                                                             value={device_serialModal}
                                                             onChange={onDeviceSerialChangeModal}
                                                             />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Device Type</label>
                                                            {!isDeviceTypesLoading ? (
                                                            <select readOnly='readonly' disabled class='form-control' id='deviceTypeIdModal' name='deviceTypeIdModal'
                                                             value={device_type_idModal}
                                                             onChange={onDeviceTypeIdChangeModal}>
                                                                <option hidden selected >Please choose a device type.</option>
                                                                {deviceTypesState.map(deviceType => <option value={deviceType.type_id} >{deviceType.type_alias}</option>)}
                                                            </select>
                                                        
                                                            )   
                                                            : (<option>Loading...</option> )

                                                            }

                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class='label'>Device Asset</label>
                                                            {!isAssetLoading ? (
                                                                <select readOnly='readonly' disabled class='form-control' id='assetIdModal' name='assetIdModal'
                                                                 value={asset_idModal}
                                                                 onChange={onAssetIdChangeModal}>
                                                                    <option hidden selected >Please choose an asset.</option>
                                                                        {assetsState.map(asset => <option value={asset.asset_id} >{asset.asset_name}</option>)}
                                                                </select>
                                                                
                                                                ) : (<option>Loading...</option> )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Device PAC</label>
                                                            <input type="text" readOnly='readonly' class='form-control' id='devicePacModal' 
                                                             name='devicePacModal' placeholder='Device PAC* '
                                                             value={device_pacModal}
                                                             onChange={onDevicePacChangeModal}/>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class='label'>Sigfox ID</label>
                                                            <input type="text" readOnly='readonly' class="form-control" id="sigfoxIDModal" 
                                                             name="sigfoxIDModal" placeholder="Sigfox ID *"
                                                             value={sigfox_idModal}
                                                             onChange={onSigfoxIdChangeModal}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Is this a prototype?</label>
                                                            <select class='form-control' required='required' id='isPrototypeModal'
                                                             name='isPrototypeModal'
                                                             value={is_prototypeModal}
                                                             onChange={onIsPrototypeChangeModal}>
                                                                <option selected hidden >Please choose an answer.</option>
                                                                <option value={'false'} title="This device will require a product certificate">No</option>
                                                                <option value={'true'} title="This device won't require a product certificate">Yes</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class='label'>Product Certificate</label>
                                                            <input type="text" class="form-control" id="productCertificateModal" 
                                                             name="productCertificateModal" placeholder="Product Certificate"
                                                             value={product_certificateModal.key}
                                                             onChange={onProductCertificateChangeModal}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class='label'>Device Status</label>
                                                    <select id='deviceStatusModal' disabled readOnly='readonly' class='form-control'
                                                     value={device_statusModal}
                                                     onChange={onDeviceStatusChangeModal}>
                                                        <option hidden selected >Please choose a device status</option>
                                                        <option value='ACTIVE'>Active</option>
                                                        <option value='REPAIRING'>Repairing</option>
                                                        <option value='DECOMMISSIONED'>Decommissioned</option>
                                                        <option value='IDLE'>Idle</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class='label'>Customer Name</label>
                                                            <input  readonly='readonly' class='form-control' id='customerIdModal' />
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>

                                            </div>
                                            
                                        </div>

                                        <div class="carousel-item">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class='label'>Device History</label>
                                                            <textarea rows='8' readonly='readonly' class="form-control" id="deviceHistoryModal" name="deviceHistoryModal" placeholder="Device History *"  ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="carousel-item">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class='label'>Packet Data</label>
                                                            {/*<!-- DataTales Example -->*/}
                                                            <div class="card shadow mb-4">
                                                                <div class="card-header py-3">
                                                                    <h6 class="m-0 font-weight-bold text-primary">Device Data</h6>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="table-responsive">
                                                                        <MDBDataTable striped bordered data={devicePacketData} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-lg-12 col-md-12 d-flex justify-content-between">
                                            <a class="left text-default btn btn-primary btn-sm" href="#deviceCarousel" role="button" data-slide="prev">
                                                <span>Previous Page</span>
                                            </a>

                                            <a class="right text-default btn btn-primary btn-sm" href="#deviceCarousel" role="button" data-slide="next">
                                                <span>Next Page</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-5"></div>
                                            <div class="col-md-7">
                                                <button type='submit' id='btnUpdateDevice' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Save Changes</span>
                                                </button>
                                            </div>
                                            <div class="col-md-2"></div>
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
        {/* Device Details Modal */}

        {/*<!-- Attach Asset Modal-->*/}
        <div class="modal fade" id="attachAssetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form method='post' onSubmit={attachAsset}>
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Want to attach a device to an asset?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            {!isAssetLoading ? (
                                <select required='required' class='form-control'
                                    value={attachAssetId}
                                    onChange={onAttachAssetChange}>
                                    <option hidden selected >Please choose an asset.</option>
                                    {assetsState.map(asset => <option value={asset.asset_id} >{asset.asset_name}</option>)}
                                </select>
                                
                                ) : (<option>Loading...</option> )
                            }
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" id='btnDeviceAttachAsset' type='submit' >Assign to assset</button>
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*<!-- Attach Asset Modal-->*/}

        </React.Fragment>
    )
}

