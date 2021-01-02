import { createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

//create the slice
export const customerSlice = createSlice({
    name: 'customers', //The name of your state
    initialState: { //This is the initial state that will have all the customers

        customers: [
            /*{
                //This is just a placeholder to ensure code doesn't break before we update the state.
                customer_id:'placeholder',
                customer_name:"placeholder",
                customer_email:"phill@placeholder.com",
                customer_telephone:"placeholder",
                customer_notes:"placeholder",
                api_key:"placeholder",
                deleted:false
            }*/
        ],
        isLoading: false,
        error: false
    },
    reducers: {
        //Reducer to get all customers
        getAllCustomers: (state,action) =>{
            //update the state
            state.customers = action.payload;
            console.log('State updated');
            state.isLoading = false;
        },
        //Reducer to create API key for a customer
        createAPIKey: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (customerID) =>{
                return {payload: customerID}
            }
        },
        //Reducer to add a customer
        addCustomer: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (customerDetails) =>{
                return {payload: customerDetails}
            }
        },
        //Reducer to add update a specific customer
        updateCustomer: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (customerDetails) =>{
                return {payload: customerDetails}
            }
        },
        //Reducer to delete a customer
        deleteCustomer: {
            reducer: (state,action) =>{
                //update the state
                console.log('State updated');
            },
            prepare: (customerID) =>{
                return {payload: customerID}
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

//Export all the reducers
export const {getAllCustomers,getCustomer, createAPIKey, addCustomer, updateCustomer,deleteCustomer, startLoading, hasError} = customerSlice.actions;

//Export the default slice
export default customerSlice.reducer

//Export the selectors
export const selectCustomers = state => state.customers;
export const selectIsLoading = state => state.isLoading;


//*******************Actions ******************* */
//********************************************** */

//-----------------Normal Actions------------------
//These are things that are normal that need to interact with the api 
//and then will update the state after.

//-------------- Asynchronous Actions----------------
export const fetchCustomers = () => async dispatch => {

    dispatch(startLoading());
    try{

        await api
        .get('/customers')
        .then(response => dispatch(getAllCustomers(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}


