//Imports
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//components
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SideBar from '../layout/SideBar';

//Admin UI
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Customers from './Customers';
import Registration from './Registration.js';
import AdminProfile from './AdminProfile';
import AssetManagement from './AssetManagement';
import DeviceTypes from './DeviceTypes';
import DeviceManagement from './DeviceManagement';
import LogHistory from './LogHistory';

//Error UI
import Page404 from './Page404';

export default function Admin() {

    return (
        
        <div id="wrapper">
                
            <SideBar/>

            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">

                    {/*<!-- Main Content -->*/}
                    <div id="content">

                        <Header/>

                        {/*<!-- Begin Page Content-->*/}
                        <div className="container-fluid">

                            {/*<!-- Switch will render the first route that matches -->*/}
                            <Switch>

                                {/* Dashboard */}
                                <Route exact path='/admin/dashboard' component = {Dashboard} />
                                {/* End Dashboard */}

                                {/* Profile */}
                                <Route exact path='/admin/profile' component = {AdminProfile} />
                                {/* End Profile */}

                                {/* UserManagement */}
                                <Route exact path='/admin/user_management' component = {UserManagement} />
                                {/* End Profile */}

                                {/* Register Customers */}
                                <Route exact path='/admin/registrations' component = {Registration} />
                                {/* End Register Customers */}

                                {/* Customers */}
                                <Route exact path='/admin/customers' component = {Customers} />
                                {/* End Customers */}

                                {/* Device Management */}
                                <Route exact path='/admin/asset_management' component = {AssetManagement} />
                                {/* End Device Management */}

                                {/* Device Types */}
                                <Route exact path='/admin/device_types' component = {DeviceTypes} />
                                {/* End Device Types */}

                                {/* Device Management */}
                                 <Route exact path='/admin/device_management' component = {DeviceManagement} />
                                {/* End Device Management */}

                                {/* Log History */}
                                <Route exact path='/admin/log_history' component = {LogHistory} />
                                {/* End Log History */}

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

