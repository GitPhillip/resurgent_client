//Imports
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

//components
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SideBar from '../layout/SideBar';

import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Customers from './Customers';
import RegisterUser from './RegisterUser';
import Page404 from './Page404';

export class Admin extends Component {
    render() {
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
                                <Route exact path='/admin/profile' component = {UserManagement} />
                                {/* End Profile */}

                                {/* UserManagement */}
                                <Route exact path='/admin/user_management' component = {UserManagement} />
                                {/* End Profile */}

                                {/* Register Customers */}
                                <Route exact path='/admin/user_registration' component = {RegisterUser} />
                                {/* End Register Customers */}

                                {/* Customers */}
                                <Route exact path='/admin/customers' component = {Customers} />
                                {/* End Customers */}

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
}

export default Admin
