import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useSelector} from 'react-redux'
import api from '../../api/api';

export default function TechnicianProfile() {

    //*************Functions**************** */

     //Get the state
     let user = useSelector(state => state.user.user);

    //local states for the form
    const [user_firstname, setFirstName] = useState('');
    const [user_surname, setSurname] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_cellphone, setCellphone] = useState('');
    const [user_password, setPassword] = useState('');
    const [user_confirmPassword, setConfirmPassword] = useState('');

    //Check the user passwords
    const passwordConfirmed = () => {
        if(user_password === user_confirmPassword) return true;
        else return false;
    }

    //onChange handlers
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSurnameChange = e => setSurname(e.target.value);
    const onEmailChange = e  => setEmail(e.target.value);
    const onCellphoneChange = e => setCellphone(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onConfirmPasswordChange = e => setConfirmPassword(e.target.value);

    //Load the admin details
    useEffect(() =>{
        //API request to get the user details
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
            
            //Send the API request to get the use type details
            api.get(`/usertypes/${response.data.data.user_type_id}`)
            .then( userTypeResponse =>{
                document.getElementById('userTypeDescription').value = userTypeResponse.data.data.user_type_description;
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
    },[user.user_id]);
    

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

                let params;
                //If the password is not empty
                
                if(user_password !== ''){
                    //Check if the passwords match - if true
                    if(passwordConfirmed()===true){
                        params = {
                            user_firstname,
                            user_surname,
                            user_cellphone,
                            user_email,
                            user_password
                        }
                        //Send the api put request
                        api.put(`/users/${user.user_id}`, params )
                        .then(response =>{
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: `${response.data.message}`
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
                    params = {
                        user_firstname,
                        user_surname,
                        user_cellphone,
                        user_email
                    }
                    //Send the api put request
                    api.put(`/users/${user.user_id}`, params )
                    .then(response =>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `${response.data.message}`
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
                <br/>
                <div class=" row register-heading" > 
                    <h3>Hi {' '}</h3><h3 id="userName" name="userName"> </h3><h3> ,here's your profile</h3>
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
                                    <label class='label'>User Type description</label>
                                    <textarea type='text' readonly='readonly' class='form-control' rows='4' id='userTypeDescription' name='userTypeDescription'>

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
            </div>
        </div>
    )
}
