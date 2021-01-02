import { createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const  adminSlice = createSlice({

    name: 'admins',
    initialState: {
        admins: [{
                    user_id:'placeholder',
                    username:"placeholder",
                    user_email:"phill@placeholder.com",
                    user_firstname:"placeholder",
                    user_surname:"placeholder",
                    user_cellphone:"placeholder",
                    user_type_id:1,
                    isActive:true,
                    deleted:false
                }
                
        ],
        isLoading: false,
        error: false
        
    },
    reducers: {
        //Recuducer to add an admin
        addAdmin: {
            reducer: (state,action) =>{
                //
                console.log('admin deleted');
            },
            prepare: (adminID) =>{
                return {payload: adminID}
            }
        },
        //Reducer to delete an admin
        deleteAdmin: {
            reducer: (state,action) =>{
                //
                console.log('admin deleted');
            },
            prepare: (adminID) =>{
                return {payload: adminID}
            }
        },
        //Reducer to get all admins
        getAdmins: (state,action) =>{
           
            state.admins = action.payload; //
            state.isLoading = false;
            
        },
        startLoading: state =>{
            state.isLoading = true;
        },
        hasError: (state,action) =>{
            state.error = action.payload;
            state.isLoading = false;
        }
        
    }

}); 


export default adminSlice.reducer

//Selctors
export const selectAdmins = state => state.admins;
export const selectIsLoading = state => state.isLoading;

export const {addAdmin, deleteAdmin, getAdmins, hasError,startLoading} = adminSlice.actions;

//***********************Actions*******************8
export const fetchAdmins = () => async dispatch => {

    dispatch(startLoading());
    try{

        await api
        .get('/users/usertype/1')
        .then(response => dispatch(getAdmins(response.data.data))
        );

    }catch(error){
        dispatch(hasError(error.message))
    }
}