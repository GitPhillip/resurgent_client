//Imports
import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

//components
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CustomerSideBar from '../layout/CustomerSideBar';

//Admin UI
import Dashboard from './Dashboard';
import CustomerProfile from './CustomerProfile';
import CustomerAssets from './CustomerAssets';
import CustomerDevices from './CustomerDevices';

//Error UI
import Page404 from './Page404';

export default function Customer({customerState, assetState, assetTypeState, deviceState,deviceTypeState, userState}) {

    //Get the global state
    let customersState = customerState;
    let assetTypesState = assetTypeState;
    let assetsState = assetState;
    let deviceTypesState = deviceTypeState;
    let devicesState = deviceState;
    let usersState = userState;

    //Check if there is an active user session
    const loggedIn = usersState.loggedIn;

    useEffect(()=>{

    },[customersState,assetState,assetTypeState,deviceState,deviceTypeState]);

    if(!loggedIn){
        return <Redirect to='/' />
    }

    
    
    return (
        
        <div id="wrapper">
                
            <CustomerSideBar/>

            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" class="d-flex flex-column">

                    {/*<!-- Main Content -->*/}
                    <div id="content">

                        <Header userState={usersState}/>

                        {/*<!-- Begin Page Content-->*/}
                        <div className="container-fluid">

                            {/*<!-- Switch will render the first route that matches -->*/}
                            <Switch>

                                {/* Dashboard */}
                                <Route exact path='/customer/dashboard' component = {Dashboard} />
                                {/* End Dashboard */}

                                {/* Profile */}
                                <Route exact path='/customer/profile' component = {CustomerProfile} />
                                {/* End Profile */}

                                {/* Asset Management */}
                                <Route exact path='/customer/assets' render = {props => (
                                                                        <CustomerAssets {...props} customerState={customersState} 
                                                                                              assetState={assetsState}
                                                                                              assetTypeState={assetTypesState}
                                                                                              deviceState={devicesState} /> 
                                                                        )} 
                                />
                                {/* End Asset Management */}


                                {/* Device Management */}
                                 <Route exact path='/customer/devices' render = {props => (
                                                                        <CustomerDevices {...props} customerState={customersState} 
                                                                                              assetState={assetsState}
                                                                                              assetTypeState={assetTypesState}
                                                                                              deviceState={devicesState}
                                                                                              deviceTypeState={deviceTypesState} /> 
                                                                        )} 
                                />
                                {/* End Device Management */}

                                {/* Catch Wrong Route */}
                                <Route component = {Page404} />
                                {/* End Catch Wrong Route */}
                                
                            </Switch>

                        </div>
                        {/*<!-- End Page Content-->*/}
                    
                        <Footer/>

                    </div>
                    {/*<!-- /End of Main Content -->*/}

            </div>
            {/*<!-- End of Content Wrapper -->*/}

        </div>

        
    )
   
}

