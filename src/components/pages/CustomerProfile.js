import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Swal from 'sweetalert2';

//Reducers
import {updateUserSession} from '../slices/userSlice';
import {updateCustomer} from '../slices/customerSlice';

import api from '../../api/api';

export default function CustomerProfile() {

    //Get the global user state
    let user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    //local states for the form -Admin
    const [user_firstname, setFirstName] = useState('');
    const [user_surname, setSurname] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_cellphone, setCellphone] = useState('');
    const [user_password, setPassword] = useState('');
    const [user_confirmPassword, setConfirmPassword] = useState('');
    const [user_role, setUserRole] = useState('');

    //Check the user passwords
    const passwordConfirmed = () => {
        if(user_password === user_confirmPassword) return true;
        else return false;
    }

    //local states for the form - customer
    const [customer_name, setCustomerName] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_telephone, setCustomerTelephone] = useState('');
    const [customer_notes, setCustomerNotes] = useState('');


    //onChange handlers - Admin
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSurnameChange = e => setSurname(e.target.value);
    const onEmailChange = e  => setEmail(e.target.value);
    const onCellphoneChange = e => setCellphone(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onConfirmPasswordChange = e => setConfirmPassword(e.target.value);
    const onUserRoleChange = e => setUserRole(e.target.value);

    //onChange handlers - Customers
    const onCustomerNameChange = e => setCustomerName(e.target.value);
    const onCustomerEmailChange = e => setCustomerEmail(e.target.value);
    const onCustomerTelephoneChange = e => setCustomerTelephone(e.target.value);
    const onCustomerNotesChange = e => setCustomerNotes(e.target.value);

    //On page load
    useEffect(() => {
        
        //Api call to get the users credetials
        api.get(`/users/${user.user_id}`)
        .then( response =>{
            
            //Populate the html accordingly
            document.getElementById('userName').innerText = response.data.data.username;
            document.getElementById('firstName').value = response.data.data.user_firstname;
            document.getElementById('surname').value = response.data.data.user_surname;
            document.getElementById('email').value = response.data.data.user_email;
            document.getElementById('cellphone').value = response.data.data.user_cellphone;
            
            //Set all the inputs
            setFirstName(response.data.data.user_firstname);
            setSurname(response.data.data.user_surname);
            setEmail(response.data.data.user_email);
            setCellphone(response.data.data.user_cellphone);
            
            //Send the API request to get the company user details
            api.get(`/customerusers/${user.user_id}`)
            .then( userTypeResponse =>{

                //Set the user row
                document.getElementById('userRole').value = userTypeResponse.data.data.user_role;
                setUserRole(userTypeResponse.data.user_role);

            }).catch(userTypeError =>{
                if(userTypeError.response && userTypeError.response.data){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${userTypeError.response.data.error}`
                    });
                }
            });
            
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

        
        //Api call to get the company credentials
        api.get(`/customers/${user.user_company_id}`)
        .then(response =>{
            
            //Populate the JSX
            document.getElementById('customerName').value = response.data.data.customer_name;
            document.getElementById('customerEmail').value = response.data.data.customer_email;
            document.getElementById('customerTelephone').value = response.data.data.customer_telephone;
            document.getElementById('customerNotes').value = response.data.data.customer_notes;

            //Set the states
            setCustomerName(response.data.data.customer_name);
            setCustomerEmail(response.data.data.customer_email);
            setCustomerTelephone(response.data.data.customer_telephone);
            setCustomerNotes(response.data.data.customer_notes);

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

       
    }, [user.user_id,user.user_company_id])

    //Update Admin Function
    let updateOneCustomer = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        let params;
        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Details?',
            text: 'Are you sure you want to update the company details?',
            showCancelButton: true,
            confirmButtonText: `Update`
          }).then((result) => {
            if (result.isConfirmed) {
              
                params = {
                    customer_name,
                    customer_email,
                    customer_telephone,
                    customer_notes
                }
                //api request to update the company
                api.put(`/customer/${user.user_company_id}`,params)
                .then(response =>{

                    //Dispatch to update the state - company state
                    dispatch(
                        updateCustomer({
                            customer_id: user.user_company_id,
                            customer_name,
                            customer_email,
                            customer_telephone,
                            customer_notes
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Customer Edit: User (ID '${user.user_id}) edited their company's profile (ID: ${customer_name}). `;
                    api.post('/systemlog',{
                        user_id: user.user_id,
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

                    //Success msg
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `${response.data.message}`
                    });

                })
                .catch(error=>{

                });

            } 
          });
    }

    //Update Admin Function
    let updateAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Save Changes?',
            text: 'Are you sure you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: `Save`,
          }).then((result) => {
            if (result.isConfirmed) {

                let userParams;
                let customerUserParams = {
                    user_role
                }
                //If the password is not empty
                
                if(user_password !== ''){
                    //Check if the passwords match - if true
                    if(passwordConfirmed()===true){
                        userParams = {
                            user_firstname,
                            user_surname,
                            user_cellphone,
                            user_email,
                            user_password
                        }
                        //Send the api put request to update the user
                        api.put(`/users/${user.user_id}`, userParams )
                        .then(response =>{

                            //send an api request to update the customer user
                            api.put(`/customerusers/${user.user_id}`, customerUserParams)
                            .then( customerUserResponse =>{

                                //Dispatch to update the state 
                                dispatch(
                                    updateUserSession({
                                        user_id: user.user_id,
                                        user_firstname,
                                        user_surname,
                                        user_email,
                                        user_role
                                    })
                                )

                                //***************SYSTEM LOG********************* */
                                //********************************************** */
                                let entry_content = `Customer User Edit: User (ID '${user.user_id}) edited their profile.`;
                                api.post('/systemlog',{
                                    user_id: user.user_id,
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


                                //Success msg
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    text: `${response.data.message} and ${customerUserResponse.data.message}`
                                });

                            })
                            .catch(customerUserError =>{
                                if(customerUserError.response && customerUserError.response.data){
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: `${customerUserError.response.data.error}`
                                    });
                                }
                            });
                        }).catch(error =>{
                            if(error.response && error.response.data){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: `${error.response.data.error}`
                                });
                            }
                        });

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Passwords don't match.`
                        });
                    }
                }else{
                    userParams = {
                        user_firstname,
                        user_surname,
                        user_cellphone,
                        user_email
                    }
                    //Send the api put request 
                    api.put(`/users/${user.user_id}`, userParams )
                    .then(response =>{
                        //send an api request to update the customer user
                        api.put(`/customerusers/${user.user_id}`, customerUserParams)
                        .then( customerUserResponse =>{

                            //Dispatch to update the state
                            dispatch(
                                updateUserSession({
                                    user_id: user.user_id,
                                    user_firstname,
                                    user_surname,
                                    user_email,
                                    user_role
                                })
                            )

                            //***************SYSTEM LOG********************* */
                            //********************************************** */
                            let entry_content = `Customer User Edit: User (ID '${user.user_id}) edited their profile.`;
                            api.post('/systemlog',{
                                user_id: user.user_id,
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

                            //Success message
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: `${response.data.message} and ${customerUserResponse.data.message}`
                            });

                        })
                        .catch(customerUserError =>{
                            if(customerUserError.response && customerUserError.response.data){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: `${customerUserError.response.data.error}`
                                });
                            }
                        });
                    }).catch(error =>{
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
          });
    }

    return (

        <div class="row">
            <div class="col-md-12 ">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="customer-tab" data-toggle="tab" href="#customer" role="tab" aria-controls="customer" aria-selected="true">Company Details</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Admin Details</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                        <br/>
                        <h3 class="register-heading">Company Details</h3>
                        <br/>
                        <form method='post' onSubmit={updateOneCustomer}>
                            <div class="row register-form">
                    
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Company Name</label>
                                                <input type="text" class="form-control" required='true' id="customerName" 
                                                 name="customerName" placeholder="Company Name *" 
                                                 value={customer_name}
                                                 onChange={onCustomerNameChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Company Email</label>
                                                <input type="email" class="form-control" required='true' id="customerEmail"
                                                 name="customerEmail" placeholder="Company Email *"
                                                 value={customer_email}
                                                 onChange={onCustomerEmailChange} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Company Telephone</label>
                                                <input type="text" maxlength="10" minlength="10" class="form-control" required='true' id="customerTelephone" 
                                                 name="customerTelephone" placeholder="Company Telephone *" 
                                                 value={customer_telephone}
                                                 onChange={onCustomerTelephoneChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Company Notes</label>
                                                <textarea type='text' class='form-control' rows='3' id='customerNotes' 
                                                 name='customerNotes' placeholder='Company Notes'
                                                 value={customer_notes}
                                                 onChange={onCustomerNotesChange}>

                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                <div class="col-md-2"></div>
                                <div class="col-md-3"></div>
                                <div class="col-md-7"><br/>
                                    <div className='row'>
                                        <button type='submit' class="btn btn-success btn-icon-split">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text">Update Details</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                        <br/> <br/>
                    </div>

                    <div class="tab-pane fade show" id="admin" role="tabpanel" aria-labelledby="admin-tab">
                        <br/>
                        <div class=" row register-heading" > 
                            <h3 id="userName" name="userName"> </h3><h3> ,here's your profile:</h3>
                        </div>
                        <br/>
                        <form method='post' onSubmit={updateAdmin}>
                            <div class="row register-form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>First Name</label>
                                                <input required='required' type="text" class="form-control" id="firstName"
                                                name="firstName" placeholder="First Name *"
                                                value={user_firstname}
                                                onChange={onFirstNameChange}/>
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Surname</label>
                                                <input required='required'type="text" class="form-control" id="surname" 
                                                name="surname" placeholder="Surname *" 
                                                value={user_surname}
                                                onChange={onSurnameChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Email</label>
                                                <input required='required' type="email" class="form-control" id="email" 
                                                name="email" placeholder="Email *"
                                                value={user_email}
                                                onChange={onEmailChange} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Cellphone</label>
                                                <input required='required' type="text" maxlength="10" minlength="10" class="form-control" id="cellphone" 
                                                name="cellphone" placeholder="Cellphone *" 
                                                value={user_cellphone}
                                                onChange={onCellphoneChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Password</label>
                                                <input type="password" class="form-control" id="password"  
                                                name="password" placeholder="Password *"
                                                value={user_password}
                                                onChange={onPasswordChange}/>
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Confirm Password</label>
                                                <input type="password" class="form-control" id="confirmPassword"  
                                                name="confirmPassword" placeholder="Confirm Password *" 
                                                value={user_confirmPassword}
                                                onChange={onConfirmPasswordChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row col-md-12">
                                            <label class='label'>User Role</label>
                                            <textarea type='text' class='form-control' rows='4' id='userRole' 
                                             name='userRole' placeholder='User Role'
                                             value={user_role}
                                             onChange={onUserRoleChange}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-2"></div>
                                <div class="col-md-3"></div>
                                <div class="col-md-7"><br/>
                                    <div class='row'>
                                        <button type='submit' class="btn btn-success btn-icon-split">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text">Save Changes</span>
                                        </button>
                                    </div>
                                </div>
                            </div><br/>
                        </form>
                        <br/> <br/>
                    </div>

                </div>
            </div>
        </div>
    )
}
