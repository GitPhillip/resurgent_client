import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*The outside thunk creator function
export const getAdmins = () =>{
    //The inside 'thunk function'
    return async(dispatch, getState) => {
        try{
            let admins = await axios.get('http://localhost:3000/api/users/usertype/1')
            .then(res => {
                admins = res.data;
                console.log(admins);
                //dispatch an action when we get the response back
               // dispatch(getAllAdmins())
            });
        }catch(err){
            console.log('Something went wrong: '+err)
        }
    }
}*/

export const adminSlice = createSlice({
    name: 'admins',
    initialState: {
        admins: {}
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
        getAllAdmins: state =>{
            axios.get('http://localhost:3000/api/users/usertype/1')
            .then(res => {
                state.admins = res.data;
                console.log(state.admins.admins);
            });
        } 
    }

}); 

export const {addAdmin, deleteAdmin, getAllAdmins} = adminSlice.actions;

//Selctors
export const selectAdmins = state => state.admins;

export default adminSlice.reducer