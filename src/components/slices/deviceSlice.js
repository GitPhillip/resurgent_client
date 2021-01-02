import {createSlice} from '@reduxjs/toolkit'
import api from '../../api/api'

export const deviceSlice = createSlice({
    name: 'devices',
    initialState:{

        devices: [
            {
                //This is just a placeholder to ensure code doesn't break before we update the state.
                device_id: 0,
                asset_id:0,
                device_type_id:0,
                sigfox_id: 'placeholder',
                device_pac: 'placeholder',
                device_status: 'placeholder',
                deleted:false
            }
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
        addDevice: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated')
            },
            prepare: (deviceDetails) =>{
                return {payload: deviceDetails}
            }
        },
        //Reducer to update a device
        updateDevice: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (deviceDetails) =>{
                return {payload: deviceDetails}
            }
        },
        //Reducer to delete a device
        deleteDevice: {
            reducer: (state, action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (deviceID) =>{
                return {payload: deviceID}
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
        .then(response => dispatch(getAllDevices(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}