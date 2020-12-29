import {configureStore } from '@reduxjs/toolkit';
import adminReducer from '../components/slices/adminSlice';
import customerReducer from '../components/slices/customerSlice';


export default configureStore({

   reducer: {
        //the names in the reducer object will define keys in our state
        admins: adminReducer,
        customers: customerReducer

   }
});
