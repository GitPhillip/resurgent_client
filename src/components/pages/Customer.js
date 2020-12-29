//Imports
import React from 'react';
import {Route, Switch} from 'react-router-dom';

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

export default function Customer() {

    return (
        
        <div id="wrapper">
                
            <CustomerSideBar/>

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
                                <Route exact path='/customer/dashboard' component = {Dashboard} />
                                {/* End Dashboard */}

                                {/* Profile */}
                                <Route exact path='/customer/profile' component = {CustomerProfile} />
                                {/* End Profile */}

                                {/* Asset Management */}
                                <Route exact path='/customer/assets' component = {CustomerAssets} />
                                {/* End Asset Management */}


                                {/* Device Management */}
                                 <Route exact path='/customer/devices' component = {CustomerDevices} />
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

