import {createSlice} from '@reduxjs/toolkit'
import api from './api'

//Create our slice 
export const deviceTypeSlice = createSlice({
    name: 'deviceTypes',
    initialState: {

        deviceTypes: [
            {
            type_id: 0,
            type_alias: 'placeholder',
            type_description: 'placeholder',
            type_conversion: 'placeholder',
            packet_structure: 'placeholder',
            sigfox_id: 'placeholder',
            deleted: 0,
            type_variables: 'placeholder',
            data_types: 'placeholder'

            }
        ],
        isLoading: false,
        error: false
    },
    reducers:{
        //Reducer to get all device types
        getAllDeviceTypes: (state,action) =>{
            //update the state
            state.deviceTypes = action.payload;
            console.log('State updated');
            state.isLoading = false;
        },
        //Reducer to add a device type
        addDeviceType:{
            reducer: (state,action) =>{
                //update the state
                console.log('State updated.');
            },
            prepare: (deviceTypeDetails) =>{
                return {payload: deviceTypeDetails}
            }
        },
        //Reducer to update a device type
        updateDeviceType:{
            reducer: (state,action) =>{
                //update the status
                console.log('State updated')
            },
            prepare: (deviceDetails) =>{
                return {payload:deviceDetails}
            }
        },
        //Reducer to delete a device type
        deleteDeviceType: {
            reduer: (status,action) =>{
                //update the status
                console.log('Status updated')
            },
            prepare: (deleteTypeID) =>{
                return {payload:deleteTypeID}
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

//Export the state
export default deviceTypeSlice.reducer;

//Export the reducers
export const {getAllDeviceTypes, addDeviceType, updateDeviceType, deleteDeviceType, startLoading, hasError} = deviceTypeSlice.actions;

//Export the Selectors
export const selectDeviceTypes = state => state.deviceTypes;
export const selectDeviceTypeIsLoading = state => state.isLoading;

/*******************Actions ******************* */
//********************************************** */

//-----------------Normal Actions------------------
//These are things that are normal that need to interact with the api 
//and then will update the state after.
//-------------- Asynchronous Actions----------------
export const fetchDeviceTypes = () => async dispatch => {

    dispatch(startLoading());
    try{
        await api
        .get('/devicetypes')
        .then(response => dispatch(getAllDeviceTypes(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}
