import React from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import api from '../../api/api';

import { deleteUserSession } from '../slices/userSlice'

export default function Header({userState}) {

    //Get the global state
    let usersState = userState.user;

    const dispatch = useDispatch();

    //Logout function
    const logout = () =>{
        //End the session/Clear the state
        dispatch(
            deleteUserSession({
            user_id: usersState.user_id
            })
        )
        //***************SYSTEM LOG********************* */
        //********************************************** */
        let entry_content = `Logout Activity: User logged out.`
        api.post('/systemlog',{
            user_id:usersState.user_id,
            entry_content})
        .then()
        .catch(error =>{
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });
        //***************SYSTEM LOG********************* */
        //********************************************** */
        //Reroute to login
        window.location='/';
    }
    return (

        <React.Fragment>

            <header>

                {/*<!-- Topbar -->*/}
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*<!-- Topbar Navbar  -->*/}
                    <ul class="navbar-nav ml-auto ">

                        {/*<!-- Nav Item - Alerts -->*/}
                        <li class="nav-item dropdown no-arrow mx-4">
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
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{usersState.user_firstname+ " "+ usersState.user_surname}</span>
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
                            <button class="btn btn-primary" type='button' onClick={logout}>Logout</button>
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
    height:"400%",
    marginLeft: '-100px'
}
