import React from 'react';
import { Link } from 'react-router-dom';

export default function TechnicianSideBar() {

    return (

            //{/*<!-- Sidebar -->*/}
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand --> "images/favicon.ico"*/}
                <Link class="sidebar-brand d-flex align-items-center justify-content-center" to="/technician/dashboard">
                <img src="/images/logo.jpg" alt='Resurgent' width='44px' />
                    <div class="sidebar-brand-text mx-3">Resugent Logistics</div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li class="nav-item active">
                    <Link class="nav-link" to="/technician/dashboard">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Users
                </div>

                {/*<!-- Personal Profile Management -->*/}
                <li class="nav-item">
                    <Link class="nav-link" to="/technician/profile" >
                        <i class="fas fa-fw fa-user"></i>
                        <span>Personal Profile</span>
                    </Link>
                </li>

                 {/*<!-- Divider -->*/}
                 <hr class="sidebar-divider"/>


                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Assets & Devices
                </div>

                {/*<!-- Nav Item - Assets -->*/}
                <li class="nav-item">
                    <Link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseAssets"
                        aria-expanded="true" aria-controls="collapseAssets">
                        <i class="fas fa-fw fa-truck"></i>
                        <span>Asset Management</span>
                    </Link>
                    <div id="collapseAssets" class="collapse" aria-labelledby="headingTwoAssets" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Devices:</h6>
                            <Link class="collapse-item" to="/technician/asset_types">Asset Types</Link>
                            <Link class="collapse-item" to="/technician/asset_management">Asset Management</Link>
                        </div>
                    </div>

                </li>

                {/*<!-- Nav Item - Pages Collapse Menu -->*/}
                <li class="nav-item">
                    <Link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseDevices"
                        aria-expanded="true" aria-controls="collapseDevices">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Device Management</span>
                    </Link>
                    <div id="collapseDevices" class="collapse" aria-labelledby="headingTwoDevices" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Devices:</h6>
                            <Link class="collapse-item" to="/technician/device_types">Device Types</Link>
                            <Link class="collapse-item" to="/technician/device_management">Device Management</Link>
                        </div>
                    </div>
                </li>


                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />

            </ul>
           // {/*<!-- End of Sidebar -->*/}

    )
}
