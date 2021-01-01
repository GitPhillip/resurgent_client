import {configureStore } from '@reduxjs/toolkit';
import adminReducer from '../components/slices/adminSlice';
import customerReducer from '../components/slices/customerSlice';
import assetReducer from '../components/slices/assetSlice';
import typeReducer from '../components/slices/typeSlice';
import deviceReducer from '../components/slices/deviceSlice';
import deviceTypesReducer from '../components/slices/deviceTypeSlice'


const store = configureStore({

   reducer: {
        //the names in the reducer object will define keys in our state
        admins: adminReducer,
        customers: customerReducer,
        assets: assetReducer,
        assetTypes: typeReducer,
        devices: deviceReducer,
        deviceTypes: deviceTypesReducer
   }
});

export default store;