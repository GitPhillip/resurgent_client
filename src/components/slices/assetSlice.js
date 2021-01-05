import {createSlice} from '@reduxjs/toolkit'
import api from '../../api/api'

export const assetSlice = createSlice({
    name: 'assets',//This will also be the name of our r
    initialState:{
        assets: [
            {
                //This is just a placeholder to ensure code doesn't break before we update the state.
                asset_id:'placeholder',
                asset_type_id: 0,
                asset_name:"phill@placeholder.com",
                asset_description:"placeholder",
                deleted:false,
                customer_id:0
            }
        ],
        isLoading: false,
        error: false
    },
    reducers:{
        //Reducer to get all customers
        getAllAssets: (state,action) =>{
            //update the state
            state.assets = action.payload;
            console.log('State updated');
            state.isLoading = false;
        },
        //Reducer to add an asset
        addAsset: (state,action) =>{
            //update the state
            state.assets.push(action.payload);
            console.log('State updated');
        },
        //Reducer to add update a specific asset
        updateOneAsset: (state,action) =>{
            //update the state
            const {asset_id,asset_type_id,asset_name,asset_description,customer_id} = action.payload;
            const exisitngAsset = state.assets.find(asset => asset.asset_id === asset_id );

            if(exisitngAsset){
                exisitngAsset.asset_id = asset_id;
                exisitngAsset.asset_type_id = asset_type_id;
                exisitngAsset.asset_name = asset_name;
                exisitngAsset.asset_description = asset_description;
                exisitngAsset.customer_id = customer_id;
                exisitngAsset.deleted = false;

            }
            console.log('State updated');
            
        },
        //Reducer to delete a asset
        deleteAsset: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (assetID) =>{
                return {payload: assetID}
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

//Export the slice with all the reducers
export default assetSlice.reducer;

//Export the reducers
export const {getAllAssets, addAsset, updateOneAsset,deleteAsset, startLoading, hasError} = assetSlice.actions;

//Selctors
export const selectAssests = state => state.assets;
export const selectIsLoading = state => state.isLoading;

/*******************Actions ******************* */
//********************************************** */

//-----------------Normal Actions------------------
//These are things that are normal that need to interact with the api 
//and then will update the state after.

//-------------- Asynchronous Actions----------------
export const fetchAssets = () => async dispatch => {

    dispatch(startLoading());
    try{

        await api
        .get('/assets')
        .then(response => dispatch(getAllAssets(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}
