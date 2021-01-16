import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerSideBar() {

    return (

            //{/*<!-- Sidebar -->*/}
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand --> "images/favicon.ico"*/}
                <Link class="sidebar-brand d-flex align-items-center justify-content-center"to="/customer/dashboard">
                    <img src="/images/logo.jpg" alt='Resurgent' width='44px' />
                    <div class="sidebar-brand-text mx-3">Resugent Logistics</div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li class="nav-item active">
                    <Link class="nav-link" to="/customer/dashboard">
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
                    <Link class="nav-link" to="/customer/profile" >
                        <i class="fas fa-fw fa-user"></i>
                        <span>Company & Personal Profile</span>
                    </Link>
                </li>


                 {/*<!-- Divider -->*/}
                 <hr class="sidebar-divider"/>


                {/*<!-- Heading -->*/}
                <div class="sidebar-heading">
                    Assets & Devices
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <li class="nav-item">
                    <Link class="nav-link" to="/customer/assets">
                        <i class="fas fa-fw fa-truck"></i>
                        <span>Assets</span></Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li class="nav-item">
                    <Link class="nav-link" to="/customer/devices">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Devices</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />

                {/*<!-- Admin -->**/}
                <div class="sidebar-heading">
                    Admin
                </div>

                {/*<!-- Nav Item - Charts -->*/}
                <li class="nav-item">
                    <Link class="nav-link" to="/customer/log_history">
                        <i class="fas fa-fw fa-clock"></i>
                        <span>Log History</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr class="sidebar-divider d-none d-md-block" />

            </ul>
           // {/*<!-- End of Sidebar -->*/}

    )
}
