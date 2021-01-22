import {createSlice} from '@reduxjs/toolkit'
import api from '../../api/api'

export const deviceSlice = createSlice({
    name: 'devices',
    initialState:{

        devices: [
            /*{
                //This is just a placeholder to ensure code doesn't break before we update the state.
                device_id: 0,
                device_name: 'placeholder',
                device_serial: 'placeholder',
                asset_id:0,
                device_type_id:0,
                sigfox_id: 'placeholder',
                device_pac: 'placeholder',
                device_status: 'placeholder',
                product_certificate: 'placeholder',
                is_prototype: 'placeholder',
                deleted:false
            }*/
        ],
        isLoading: false,
        error: false,
    },
    reducers: {
        //Reducer to get all devices
        getAllDevices: (state,action) =>{
            //update the state
            state.devices = action.payload;
            console.log('State updated');
            state.isLoading = false;
        },
        //Reducer to add device
        addDevice: (state,action) =>{

            //add the device to the state
            state.devices.push(action.payload);
            console.log('State updated');

        },
        //Reducer to update a device
        updateDevice: (state,action) =>{

            //Get the payload
            const { device_id, device_name, device_serial, asset_id, is_prototype, product_certificate, device_status} = action.payload;

            //find the device to be update
            const existingDevice = state.devices.find(device => device.device_id === device_id);
            //Update the instance
            if(existingDevice){
                //Only update if the value has been passed
                if(device_name) existingDevice.device_name = device_name;
                if(device_serial) existingDevice.device_serial = device_serial;
                if(is_prototype) existingDevice.is_prototype = is_prototype;
                if(product_certificate) existingDevice.product_certificate = product_certificate;
                if(device_status) existingDevice.device_status = device_status;
                if(asset_id) existingDevice.asset_id = asset_id;

                console.log('State updated');
            }

        },
        //Reducer to delete a device
        deleteDevice: (state, action) =>{
            
            //Prepare the payload
            const {device_id} = action.payload;

            //find the device to be updated
            const existingDevice = state.devices.find(device => device.device_id === device_id);
            
            //if the device existing
            if(existingDevice){
                state.devices.filter(device => device.device_id !== existingDevice.device_id);
            }
        },
        //these are for when waiting for api request to finish
        startLoading: state =>{
            state.isLoading = true;
        },
        hasError: (state,action) =>{
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});


//Export the slice (state)
export default deviceSlice.reducer;

//Export all the reducers
export const {getAllDevices,addDevice,updateDevice,deleteDevice,startLoading,hasError} = deviceSlice.actions

//Selectors
export const selectDevices = state => state.devices;
export const selectIsLoadingDevices = state => state.isLoading;

/*******************Actions ******************* */
//********************************************** */

//-----------------Normal Actions------------------
//These are things that are normal that need to interact with the api 
//and then will update the state after.
//-------------- Asynchronous Actions----------------
export const fetchDevices = () => async dispatch => {

    dispatch(startLoading());
    try{
        await api
        .get('/devices')
        .then(response => dispatch(getAllDevices(response.data.data)));

    }catch(error){
        dispatch(hasError(error.message))
    }
}