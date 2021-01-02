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
        addAsset: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (assetDetails) =>{
                return {payload: assetDetails}
            }
        },
        //Reducer to add update a specific asset
        updateAsset: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (assetDetails) =>{
                return {payload: assetDetails}
            }
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
export const {getAllAssets, addAsset, updateAsset,deleteAsset, startLoading, hasError} = assetSlice.actions;

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
