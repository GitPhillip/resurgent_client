import React, {useState} from 'react';

import Swal from 'sweetalert2';
//Import the api
import api from '../../api/api';

export default function ForgotPassword() {

    //Need to have the local states
    const [email, setEmail] = useState('');

    //set the onchange listener
    const onEmailChange = e => setEmail(e.target.value);

    //Function to send the api request
    let forgotPassword = (e) =>{

        //Prevent the form from submitting
        e.preventDefault();

        //Send the api request
        api.post('/auth/reset_password',{
            email,
        }).then(response =>{

            //***************SYSTEM LOG********************* */
            //********************************************** */
            /*let entry_content = `Forgot Password Reset: User (Names: ${response.data.user.user_firstname} ${response.data.user.user_surname} ID: ${response.data.user.user_id}) forgot their password and reset it. New password sent to their email`;
            api.post('/systemlog',{
                user_id: response.data.user.user_id,
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

            //Trigger the swal
            Swal.fire({
                icon: 'success',
                title: 'Password Reset!',
                text: `${response.data.message}`
            });

            //Clear the inputs
            setEmail('');

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

    return (
        <div class="bg-gradient-primary">
            
            <div class="container">

                {/*<!-- Outer Row -->*/}
                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                {/*<!-- Nested Row within Card Body -->*/}
                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                <p class="mb-4">We get it, stuff happens. Just enter your email address below
                                                    and we'll send you a link to reset your password!</p>
                                            </div>
                                            <form class='user' method='post' onSubmit={forgotPassword}>
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-user" required='required'
                                                        id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." 
                                                        value={email}
                                                        onChange={onEmailChange}/>
                                                </div>
                                                <button type='submit' class="btn btn-primary btn-user btn-block">
                                                    Reset Password
                                                </button>
                                            </form>
                                            <hr />
                                            <div class="text-center">
                                                <a class="small" href="/">Know your password? Login!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}
