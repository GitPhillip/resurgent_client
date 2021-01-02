import {createSlice} from '@reduxjs/toolkit'
import api from '../../api/api'

export const typeSlice = createSlice({
    name: 'assetTypes', //The name of our state
    initialState: {

        assetTypes: [
            {
                //This is just a placeholder to ensure code doesn't break before we update the state.
                type_id: 0,
                type_alias:"placeholder",
                type_description:"placeholder",
                deleted:false
            }
        ],
        isLoading: false,
        error: false
    },
    reducers:{
        //Reducer to get all asset types
        getAllAssetTypes: (state,action) =>{
            //update the state
            state.assetTypes = action.payload;
            console.log('State updated');
            state.isLoading = false;
        },
        addAssetType: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (assetTypeDetails) =>{
                return {payload: assetTypeDetails}
            }
        },
        updateAssetType: {
            reducer: (state,action)=> {
                //update the state
                console.log('State updated');
            },
            prepare: (assetTypeDetails) =>{
                return {payload: assetTypeDetails}
            }
        },
        deleteAssestType: {
            reducer: (state,action) =>{

            },
            prepare: (assetTypeID) =>{
                return {payload: assetTypeID}
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

//Export the slice
export default typeSlice.reducer;

//Export the reducers
export const {getAllAssetTypes, addAssetType, updateAssetType, deleteAssestType, startLoading, hasError} = typeSlice.actions

//Selctors
export const selectAssestTypes = state => state.assetTypes;
export const selectIsLoadingAssestTypes = state => state.isLoading;

/*******************Actions ******************* */
//********************************************** */

//-----------------Normal Actions------------------
//These are things that are normal that need to interact with the api 
//and then will update the state after.
//-------------- Asynchronous Actions----------------
export const fetchAssetTypes = () => async dispatch => {

    dispatch(startLoading());
    try{
        await api
        .get('/assettypes')
        .then(response => dispatch(getAllAssetTypes(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}