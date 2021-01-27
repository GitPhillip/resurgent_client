import React from 'react';

export default function SideBar() {

    return (

           // {/*<!-- Sidebar -->*/}
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand --> "images/favicon.ico"*/}
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/admin/dashboard">
                <img src="/images/logo.jpg" alt='Resurgent' width='44px' />
                    <div class="sidebar-brand-text mx-3">Resurgent Logistics</div>
                </a>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li class="nav-item active">
                    <a class="nav-link" href="/admin/dashboard">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Users
                </div>

                {/*<!-- Personal Profile Management -->*/}
                <li class="nav-item">
                    <a class="nav-link" href="/admin/profile" >
                        <i class="fas fa-fw fa-user"></i>
                        <span>Personal Profile</span>
                    </a>
                </li>

                {/*<!-- Personal Profile Management -->*/}
                <li class="nav-item">
                    <a class="nav-link collapsed" href data-toggle="collapse" data-target="#collapseUserManagement"
                        aria-expanded="true" aria-controls="collapseUserManagement">
                        <i class="fas fa-fw fa-users"></i>
                        <span>User Management</span>
                    </a>
                    <div id="collapseUserManagement" class="collapse" aria-labelledby="headingUserManagement" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Manage users:</h6>
                            <a class="collapse-item" href="/admin/registrations">Registrations</a>
                            <a class="collapse-item" href="/admin/user_management">User Management</a>
                        </div>
                    </div>
                </li>

                 {/*<!-- Divider -->*/}
                 <hr class="sidebar-divider"/>


                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Assets & Devices
                </div>

                {/*<!-- Nav Item - Assets -->*/}
                <li class="nav-item">
                    <a class="nav-link collapsed" href data-toggle="collapse" data-target="#collapseAssets"
                        aria-expanded="true" aria-controls="collapseAssets">
                        <i class="fas fa-fw fa-truck"></i>
                        <span>Asset Management</span>
                    </a>
                    <div id="collapseAssets" class="collapse" aria-labelledby="headingTwoAssets" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Devices:</h6>
                            <a class="collapse-item" href="/admin/asset_types">Asset Types</a>
                            <a class="collapse-item" href="/admin/asset_management">Asset Management</a>
                        </div>
                    </div>

                </li>

                {/*<!-- Nav Item - Pages Collapse Menu -->*/}
                <li class="nav-item">
                    <a class="nav-link collapsed" href data-toggle="collapse" data-target="#collapseDevices"
                        aria-expanded="true" aria-controls="collapseDevices">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Device Management</span>
                    </a>
                    <div id="collapseDevices" class="collapse" aria-labelledby="headingTwoDevices" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Devices:</h6>
                            <a class="collapse-item" href="/admin/device_types">Device Types</a>
                            <a class="collapse-item" href="/admin/device_management">Device Management</a>
                        </div>
                    </div>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />


                {/*<!-- Admin -->*/}
                <div class="sidebar-heading">
                    Customers
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <li class="nav-item">
                    <a class="nav-link" href="/admin/customers">
                    <i class="fas fa-handshake"></i>
                        <span>Customers</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />


                {/*<!-- Admin -->*/}
                <div class="sidebar-heading">
                    Admin
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <li class="nav-item">
                    <a class="nav-link" href="/admin/log_history">
                        <i class="fas fa-fw fa-clock"></i>
                        <span>Log History</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />

            </ul>
          // {/*<!-- End of Sidebar -->*/}

    )
}
