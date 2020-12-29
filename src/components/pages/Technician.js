//Imports
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//components
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import TechnicianSideBar from '../layout/TechnicianSideBar';

//Admin UI
import Dashboard from './Dashboard';
import TechnicianProfile from './TechnicianProfile';
import AssetManagement from './AssetManagement';
import DeviceTypes from './DeviceTypes';
import TechnicianDeviceManagement from './TechnicianDeviceManagement';

//Error UI
import Page404 from './Page404';

export default function Technician() {

    return (
        
        <div id="wrapper">
                
            <TechnicianSideBar/>

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
                                <Route exact path='/technician/dashboard' component = {Dashboard} />
                                {/* End Dashboard */}

                                {/* Profile */}
                                <Route exact path='/technician/profile' component = {TechnicianProfile} />
                                {/* End Profile */}

                                {/* Asset Management */}
                                <Route exact path='/technician/asset_management' component = {AssetManagement} />
                                {/* End Asset Management */}

                                {/* Device Types */}
                                <Route exact path='/technician/device_types' component = {DeviceTypes} />
                                {/* End Device Types */}

                                {/* Device Management */}
                                 <Route exact path='/technician/device_management' component = {TechnicianDeviceManagement} />
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

