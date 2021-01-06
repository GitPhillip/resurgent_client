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
        addAssetType:(state,action) =>{
            //update the state
            state.assetTypes.push(action.payload);
            console.log('State updated');
        },
        updateAssetType: (state,action)=> {
            //update the state
            const {type_id, type_alias, type_description } = action.payload;
            const existingAssetType = state.assetTypes.find(assetType => assetType.type_id ===type_id)
            if(existingAssetType){
                existingAssetType.type_alias = type_alias;
                existingAssetType.type_description = type_description;
            }
            console.log('State updated');
        },
        deleteAssestType: (state,action) =>{
            //get the payload
            const{type_id} = action.payload;
            //update the state
            const existingAssetType = state.assetTypes.find(assetType => assetType.type_id ===type_id)
            if(existingAssetType){
                state.assetTypes = state.assetTypes.filter(assetType => assetType.type_id !== existingAssetType.type_id);
            }
            console.log('State updated');
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