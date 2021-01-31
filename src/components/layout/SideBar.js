import React from 'react';
import { Link } from 'react-router-dom';


export default function SideBar() {

    return (

        <nav class="nav" id="accordionSidebar" role="navigation" style={background}>
            {/*<!-- Sidebar --> bg-gradient-primary navbar-nav  sidebar-dark accordion*/}
            <ul class=" sidebar-nav sidebar-dark accordion" >

                {/*<!-- Sidebar - Brand --> "images/favicon.ico"*/}
                <Link class="sidebar-brand d-flex align-items-center justify-content-center" to="/admin/dashboard">
                <img src="/images/logo.jpg" alt='Resurgent' width='44px' />
                    <div class="sidebar-brand-text mx-3">Resurgent Logistics</div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <div class="nav-item active">
                    <Link class="nav-link" to="/admin/dashboard">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span> Dashboard</span></Link>
                </div>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Users
                </div>

                {/*<!-- Personal Profile Management -->*/}
                <div class="nav-item">
                    <Link class="nav-link" to="/admin/profile" >
                        <i class="fas fa-fw fa-user"></i>
                        <span> Personal Profile</span>
                    </Link>
                </div>

                {/*<!-- Personal Profile Management -->*/}
                <div class="nav-item">
                    <Link class="nav-link collapsed" to data-toggle="collapse" data-target="#collapseUserManagement"
                        aria-expanded="true" aria-controls="collapseUserManagement">
                        <i class="fas fa-fw fa-users"></i>
                        <span> User Management</span>
                    </Link>
                    <div id="collapseUserManagement" class="collapse" aria-labelledby="headingUserManagement" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Manage users:</h6>
                            <Link class="collapse-item" to="/admin/registrations">Registrations</Link><br/>
                            <Link class="collapse-item" to="/admin/user_management">User Management</Link>
                        </div>
                    </div>
                </div>

                 {/*<!-- Divider -->*/}
                 <hr class="sidebar-divider"/>


                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Assets & Devices
                </div>

                {/*<!-- Nav Item - Assets -->*/}
                <div class="nav-item">
                    <Link class="nav-link collapsed" data-toggle="collapse" data-target="#collapseAssets"
                        aria-expanded="true" aria-controls="collapseAssets">
                        <i class="fas fa-fw fa-truck"></i>
                        <span> Asset Management</span>
                    </Link>
                    <div id="collapseAssets" class="collapse" aria-labelledby="headingTwoAssets" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Assets & Devices:</h6>
                            <Link class="collapse-item" to="/admin/asset_types">Asset Types</Link><br/>
                            <Link class="collapse-item" to="/admin/asset_management">Asset Management</Link>
                        </div>
                    </div>

                </div>

                {/*<!-- Nav Item - Pages Collapse Menu -->*/}
                <div class="nav-item">
                    <Link class="nav-link collapsed"  data-toggle="collapse" data-target="#collapseDevices"
                        aria-expanded="true" aria-controls="collapseDevices">
                        <i class="fas fa-fw fa-cog"></i>
                        <span> Device Management</span>
                    </Link>
                    <div id="collapseDevices" class="collapse" aria-labelledby="headingTwoDevices" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Devices Management:</h6>
                            <Link class="collapse-item" to="/admin/device_types">Device Types</Link><br/>
                            <Link class="collapse-item" to="/admin/device_management">Device Management</Link>
                        </div>
                    </div>
                </div>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />


                {/*<!-- Admin -->*/}
                <div class="sidebar-heading">
                    Customers
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <div class="nav-item">
                    <Link class="nav-link" to="/admin/customers">
                    <i class="fas fa-handshake"></i>
                        <span> Customers</span></Link>
                </div>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />


                {/*<!-- Admin -->*/}
                <div class="sidebar-heading">
                    Admin
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <div class="nav-item">
                    <Link class="nav-link" to="/admin/log_history">
                        <i class="fas fa-fw fa-clock"></i>
                        <span> Log History</span></Link>
                </div>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />

            </ul>
          {/*<!-- End of Sidebar -->*/}

        </nav>
    )
}


const background ={
    backgroundColor: '#014375'
}