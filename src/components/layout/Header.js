import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (

        <React.Fragment>

            <header>

                {/*<!-- Topbar -->*/}
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*<!-- Sidebar Toggle (Topbar) -->*/}
                    <form class="form-inline">
                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>
                    </form>

                    {/*<!-- Topbar Search  -->
                    <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>*/}

                    {/*<!-- Topbar Navbar  -->*/}
                    <ul class="navbar-nav ml-auto">

                        {/*<!-- Nav Item - Search Dropdown (Visible Only XS)  -->*/}
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <Link class="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </Link>
                            {/*<!-- Dropdown - Messages  -->*/}
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        {/*<!-- Nav Item - Alerts -->*/}
                        <li class="nav-item dropdown no-arrow mx-1">
                            <Link class="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-bell fa-fw"></i>
                                {/*<!-- Counter - Alerts -->*/}
                                <span class="badge badge-danger badge-counter">3+</span>
                            </Link>
                            {/*<!-- Dropdown - Alerts -->*/}
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown" style={scrollCSS} >
                                <h6 class="dropdown-header">
                                    Notification Center
                                </h6>
                                <Link class="dropdown-item d-flex align-items-center" to="#">
                                    <div>
                                        <div class="small text-gray-500">December 12, 2019</div>
                                        <span class="font-weight-bold">A new monthly report is ready to download!</span>
                                        <button class = 'float-right btn-circle btn-sm btn-danger'><i class='fas fa-trash'></i></button>
                                    </div>
                                </Link>
                                <Link class="dropdown-item d-flex align-items-center" to="#">
                                    <div>
                                        <div class="small text-gray-500">December 12, 2019</div>
                                            A new monthly report is ready to download!
                                            <button class = 'float-right btn-circle btn-sm btn-danger'><i class='fas fa-trash'></i></button>
                                    </div>
                                </Link>
                                <Link class="dropdown-item d-flex align-items-center" to="#">
                                    <div>
                                        <div class="small text-gray-500">December 12, 2019</div>
                                            A new monthly report is ready to download!
                                            <button class = 'float-right btn-circle btn-sm btn-danger'><i class='fas fa-trash'></i></button>
                                    </div>
                                </Link>
                            </div>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        {/*<!-- Nav Item - User Information-->*/}
                        <li class="nav-item dropdown no-arrow">
                            <Link class="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                            </Link>
                            {/*<!-- Dropdown - User notification-->*/}
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                
                                <Link class="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>

                    </ul>

                </nav>
                {/*<!--  End of Topbar-->*/}

            </header>

             {/*<!--  Logout Modal-->*/}
            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- End of Logout Modal-->*/}

        </React.Fragment>
    )
}

const scrollCSS = {

    WebkitOverflowScrolling:"touch",
    overflowY:"scroll",
    height:"400%"
}
