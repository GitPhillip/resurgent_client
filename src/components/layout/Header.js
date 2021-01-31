import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import api from '../../api/api';

import { deleteUserSession } from '../slices/userSlice'

export default function Header({userState}) {

    //Get the global state
    let usersState = userState.user;

    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const [blnNotificationsExist, setBlnNotificationsExist] = useState(false);

    //On page load
    useEffect(() => {
        
        //Api request to get notifications
        api.get(`/notifications/user/${usersState.user_id}`)
        .then(response =>{
            
            //set the state - notifications count
            setNotificationsCount(response.data.data.length);

            //if there are no notifications
            if(response.data.data.length === 0){

            }else{
                //set the state - notifications
                setNotifications(response.data.data);
                setBlnNotificationsExist(true);
            }

        })
        .catch(error =>{
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });
    }, [usersState.user_id])

    //Logout function
    const logout = () =>{

        //Send a request to the database to update the active status
        api.put(`/users/${usersState.user_id}`, {isActive: false} )
        .then()
        .catch(error=>{
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });

        //End the session/Clear the state
        dispatch(
            deleteUserSession({
            user_id: usersState.user_id
            })
        )
        //***************SYSTEM LOG********************* */
        //********************************************** */
        let entry_content = `Logout Activity: User (ID: ${usersState.user_id}) logged out.`
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

    //View notification
    let viewNotification = (e) =>{

        //Get the notifcation id
        var notificationId = parseInt(e.target.getAttribute('data-id'));

        if(isNaN(notificationId)){

            Swal.fire({
                icon: 'warning',
                title: 'Oopss...',
                text: `Something went wrong`,
                timer: 1000,
            });

            //Close the modal
            document.getElementById('notificationModal').click();
             
        }
        else{
            //send the api request to get the notification details
            api.put(`/notifications/${notificationId}`,{
                notification_viewed: true
            })
            .then(response =>{

                //Populate the modal body
                document.getElementById('notificationDate').innerHTML = response.data.data.notification_date.substring(0,16);
                document.getElementById('notificationContent').innerHTML = response.data.data.notification_content;

            })
            .catch(error =>{
                if(error.response && error.response.data){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error.response.data.error}`
                    });
                }
            });
        }
        
    }

    //Delete notification
    let deleteNotification = (e) =>{

        //Get the notifcation id
        var notificationId = parseInt(e.target.getAttribute('data-id'));

        if(isNaN(notificationId)){

            Swal.fire({
                icon: 'warning',
                title: 'Oopss...',
                text: `Something went wrong`,
                timer: 1000,
            });
             
        }
        else{
            //send the api request to get the notification details
            api.put(`/notifications/${notificationId}`, {
            notification_dismissed: true})
            .then(response =>{
                
                //Lets update the state
                const nots = notifications.filter(notification => notification.notification_id !== notificationId);

                //Update the state
                setNotifications(nots)
            })
            .catch(error =>{
                if(error.response && error.response.data){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error.response.data.error}`
                    });
                }
            });
        }

    }

    return (

        <React.Fragment>

                {/*<!-- Topbar -->*/}
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*<!-- Sidebar Toggle (Topbar) d-md-none -->*/}
                        <i class="fa fa-bars fa-2x toggle-btn " data-toggle="collapse" data-target="#accordionSidebar"></i>
                    


                    {/*<!-- Topbar Navbar  -->*/}
                    <ul class="navbar-nav ml-auto ">

                        {/*<!-- Nav Item - Messages -->*/}
                        <li class=" container nav-item dropdown no-arrow mx-1" > 
                            <div class="container" >
                                <a class="nav-link dropdown-toggle" href id="messagesDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-envelope fa-fw"></i>
                                    {/*<!-- Counter - Messages -->*/}
                                    <span class="badge badge-danger badge-counter">{notificationsCount}</span>
                                </a>
                                {/*<!-- Dropdown - Messages -->*/}
                                
                                <div class="dropdown-list dropdown-menu dropdown-menu-left shadow animated--grow-in"
                                    aria-labelledby="messagesDropdown" >
                                    <h6 class="dropdown-header" >
                                        Notifications Center
                                    </h6>
                                    
                                    <div style={scrollCSS}>
                                    {blnNotificationsExist ? 

                                    (   
                                        notifications.map(notification => 
                                            <React.Fragment>
                                            <a class="dropdown-item d-flex align-items-center" href>
                                                <div class='col-md-12'>
                                                    <div class="font-weight-bold">
                                                        <div class="small text-gray-500">{notification.notification_date.substring(0,16)}</div>
                                                        <div class="row">
                                                            <span class=" text-truncate">
                                                                {notification.notification_content}
                                                           </span>
                                                           <div class="dropdown-list-image mr-2">
                                                                <button title='View notification' data-id={notification.notification_id} type='button' onClick={viewNotification} data-toggle="modal" data-target="#notificationModal" class='float-right btn-circle btn-sm btn-success'>
                                                                    <i class='fas fa-eye'></i>
                                                                </button>{' '}
                                                           </div>
                                                            <div class="dropdown-list-image mr-2">
                                                                {
                                                                    notification.notification_viewed === false ? 
                                                                    (
                                                                        <div title='Never opened' class="status-indicator bg-success"></div>
                                                                    )
                                                                    :
                                                                    (
                                                                        <div title='Notification opened' class="status-indicator bg-default"></div>
                                                                    )
                                                                }
                                                                <button data-id={notification.notification_id} title='Dismiss notification' type='button' onClick={deleteNotification} class='float-right btn-circle btn-sm btn-danger'>
                                                                    <i class='fas fa-trash'></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            </React.Fragment>
                                        )
                                    ) 
                                    :
                                    (   
                                        <div> No notifications to show </div>
                                    )

                                    }
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </li>
                    
                    

                        <div class="topbar-divider d-md-none d-sm-block"></div>

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

                        <li class="nav-item dropdown no-arrow">
                            <Link class="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-xl-none d-lg-none d-lg-inline text-gray-600 "><i class='fa fa-sign-out-alt fa-sm'></i></span>
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

            {/*<!-- Notification Modal -->*/}
            <div class="modal fade" id="notificationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="notificationDate">Date</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id='notificationContent'>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- End of Notification Modal-->*/}

        </React.Fragment>
    )
}

const scrollCSS = {

    WebkitOverflowScrolling:"touch",
    overflowY:"scroll",
    overflowX:"scroll",
    height: '300px'
}
