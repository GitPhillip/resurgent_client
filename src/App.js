//Imports
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Persisting sessions


//components
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Admin from './components/pages/Admin';
import Technician from './components/pages/Technician';
import Customer from './components/pages/Customer';
import Page404 from './components/pages/Page404';

//Import selector to get the global state
import {useSelector, useDispatch} from 'react-redux'

//************Import reducers****************
//***************************************** */

//Customer Slice
import {/*selectCustomers, selectIsLoading,*/ fetchCustomers} from './components/slices/customerSlice'

//Asset Slice
import { fetchAssets } from './components/slices/assetSlice';

//Asset Type Slice
import { fetchAssetTypes } from './components/slices/typeSlice';

//Devices
import { fetchDevices } from './components/slices/deviceSlice';

//Device Types
import { fetchDeviceTypes } from './components/slices/deviceTypeSlice';

export default function App() {

    //Get the different parts of the state
    const customers = useSelector(state => state.customers); 
    const assetTypes = useSelector(state => state.assetTypes);
    const assets = useSelector(state => state.assets);
    const deviceTypes = useSelector(state => state.deviceTypes);
    const devices = useSelector(state => state.devices);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() =>{
        
        //Fetch all the customers
        dispatch(fetchCustomers());

        //fetch all the asset types
        dispatch(fetchAssetTypes());

        //fetch all the assets
        dispatch(fetchAssets());

        //fetch all the device types
        dispatch(fetchDeviceTypes());

        //fetch all the devices
        dispatch(fetchDevices());

       
    }, [dispatch]);

    return (

      <Router>

          {/* Can only put Routes in switch component */}
          <Switch> 

                {/* Login */}
                <Route exact path='/' render = {props => (
                                                <Login {...props} userState={user} />
                                                  )} />
                {/* End Login */}

                {/* ForgotPassword */}
                <Route path='/forgot_password' component = {ForgotPassword} />
                {/* End ForgotPassword */}
              
               
                    
                    {/* Admin screens */}
                    <Route path='/admin' render = {props => (
                                                    <Admin {...props} customerState={customers} 
                                                                    assetState={assets} 
                                                                    assetTypeState={assetTypes}
                                                                    deviceState={devices} 
                                                                    deviceTypeState={deviceTypes}
                                                                    userState={user}/> 
                                                    )} 
                    />
                    {/* End Admin screens */}

                    {/* Technician screens */}
                    <Route path='/technician'  render = {props => (
                                                    <Technician {...props} customerState={customers} 
                                                                        assetState={assets} 
                                                                        assetTypeState={assetTypes}
                                                                        deviceState={devices}
                                                                        deviceTypeState={deviceTypes}
                                                                        userState={user} /> 
                                                    )} 
                    />
                    {/* End Admin screens */}

                    {/* Customer screens */}
                    <Route path='/customer' render = {props => (
                                                    <Customer {...props} customerState={customers} 
                                                                        assetState={assets} 
                                                                        assetTypeState={assetTypes}
                                                                        deviceState={devices}
                                                                        deviceTypeState={deviceTypes}
                                                                        userState={user} /> 
                                                    )} 
                    />
                    {/* End Customer screens */}


                {/* Catch Wrong Route */}
                <Route component = {Page404} />
                {/* End Catch Wrong Route */}
              
          </Switch>
          
      </Router>
        
    )
}
