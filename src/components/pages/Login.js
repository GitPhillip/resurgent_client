import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MDBBtn } from 'mdbreact';

import api from '../../api/api';
import { setUserSession } from '../slices/userSlice';

export default function Login({userState}) {

    //get your user state stuff
    const loggedIn  = useSelector(state => state.loggedIn)

    const dispatch = useDispatch();

    //**********Local States for the inputs********** */
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    //onChange handlers
    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

     //*******************To Redirect****************** */
     const history = useHistory();

    //*************Functions**************
    let userLogin = (e) => {
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //send a request to the api with the relevant
        api.post('/auth',{
            email,
            password
        }).then(response =>{

            //Check if the account is deleted or not
            if(response.data.data.deleted){
                Swal.fire({
                    icon: 'error',
                    title: 'Account Deleted',
                    text: `Your accont has been deleted. Please contact the administrators if this is a problem.`
                });
            }else{

                let user_id = response.data.data.user_id;
                let user_firstname = response.data.data.user_firstname; 
                let user_surname = response.data.data.user_surname; 

                //--------Create the session--------
                //If it's an admin
                if(response.data.data.user_type_id === 1){

                    if (loggedIn) {
                        return <Redirect to="/admin/dashboard" />;
                    }

                    //Send a request to the database to update the active status
                    api.put(`/users/${user_id}`, {isActive: true} )
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

                    //dispatch to create an admin
                    dispatch(
                        setUserSession({
                        user_id,
                        user_email: response.data.data.user_email,
                        user_type: 'ADMIN',
                        user_firstname,
                        user_surname,
                        isActive: true
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Login Activity: User (ID: ${user_id}) logged in.`
                    api.post('/systemlog',{
                        user_id,
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

                    //Redirect to the relevant pages
                    history.push('/admin/dashboard');

                }//If it's a technician
                else if(response.data.data.user_type_id === 2){

                    //dispatch to create a technician
                    dispatch(setUserSession({
                        user_id: response.data.data.user_id,
                        user_email: response.data.data.user_email,
                        user_type: 'TECHNICIAN',
                        user_firstname: response.data.data.user_firstname,
                        user_surname: response.data.data.user_surname,
                        isActive: true
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Login Activity: User (ID: ${user_id}) logged in.`
                    api.post('/systemlog',{
                        user_id,
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

                    //Redirect to the relevant pages
                    history.push('/technician/dashboard');

                }//If it is a customer
                else if(response.data.data.user_type_id === 3){

                    //send an api request to get the customer user details
                    api.get(`/customerusers/${response.data.data.user_id}`)
                    .then( userTypeResponse =>{

                        //dispatch to create an customer
                        dispatch(
                            setUserSession(
                            {
                                user_id: response.data.data.user_id,
                                user_email: response.data.data.user_email,
                                user_type: 'CUSTOMER_USER',
                                user_firstname: response.data.data.user_firstname,
                                user_surname: response.data.data.user_surname,
                                user_company_id: userTypeResponse.data.data.customer_id,
                                isActive: true
                            })
                        )

                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Login Activity: User (ID: ${user_id}) logged in.`
                        api.post('/systemlog',{
                            user_id,
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

                    }).catch(userTypeError =>{
                        if(userTypeError.response && userTypeError.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${userTypeError.response.data.error}`
                            });
                        }
                    });
                    //Redirect to the relevant pages
                    history.push('/customer/dashboard');
                }
            }
           
            //Catch the login response error
        }).catch(error => {
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });

    };

    return (

        <div  style={background}><br/><br/>


            <div class="container" >
                
                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">

                                <div class="row" >
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form class="user" method='post' onSubmit={userLogin}>
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                        value={email}
                                                        onChange={onEmailChange} />
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password"
                                                        value={password}
                                                        onChange={onPasswordChange} />
                                                </div>
                                                <MDBBtn type='submit' class="btn btn-primary btn-user btn-block" >
                                                    Login 
                                                </MDBBtn>
                                            </form>
                                            <hr/>
                                            <div class="text-center">
                                                <Link to='/forgot_password' class="small" >Forgot Password?</Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/><br/><br/><br/><br/><br/>
                    </div>
                    
                </div>

            </div>
                
        </div>
    )
}

const background ={
    backgroundColor: '#014375'
}