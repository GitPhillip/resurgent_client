import {configureStore } from '@reduxjs/toolkit';

//Sessions 
import {persistReducer, persistStore} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
//import storage from 'redux-persist/lib/storage/';
import userReducer from '../components/slices/userSlice';

import adminReducer from '../components/slices/adminSlice';
import customerReducer from '../components/slices/customerSlice';
import assetReducer from '../components/slices/assetSlice';
import typeReducer from '../components/slices/typeSlice';
import deviceReducer from '../components/slices/deviceSlice';
import deviceTypesReducer from '../components/slices/deviceTypeSlice';


  
//Persisting state
const authPersistConfig = {
   key: 'root', //The key for the persist
   storage: sessionStorage, // The storage adapter - sessionStorage | localStorage | cookies | memory
   timeout: 2000,
   
}

const persistedReducer = persistReducer(authPersistConfig, userReducer)

const store = configureStore({

   reducer: {
        //the names in the reducer object will define keys in our state
        admins: adminReducer,
        customers: customerReducer,
        assets: assetReducer,
        assetTypes: typeReducer,
        devices: deviceReducer,
        deviceTypes: deviceTypesReducer,
        //for the user session to remain persistent
        user: persistedReducer
   }
});

export default store;

//persist the store
const persistor = persistStore(store);

//export the persistor
export {persistor};