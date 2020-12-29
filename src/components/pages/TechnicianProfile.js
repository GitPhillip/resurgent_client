import React from 'react'
import Swal from 'sweetalert2'

export default function TechnicianProfile() {

    //*************Functions**************** */

    //Update Admin Function
    let updateAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Save Changes?',
            text: 'Are you sure you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            } 
          });
    }

    return (
        <div class="row">

            <div class="col-md-12 ">
                <br/>
                <h3 id="userName" name="userName" class="register-heading" >Hi Douglas, here's your profile:</h3>
                <br/>
                <form method='post' onSubmit={updateAdmin}>
                    <div class="row register-form">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class='label'>First Name</label>
                                        <input required='required' type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name *"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label class='label'>Surname</label>
                                        <input required='required'type="text" class="form-control" id="surname" name="surname" placeholder="Surname *" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class='label'>Email</label>
                                        <input required='required' type="email" class="form-control" id="email" name="email" placeholder="Email *" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class='label'>Cellphone</label>
                                        <input required='required' type="text" maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class='label'>Password</label>
                                        <input type="password" class="form-control" id="password"  name="password" placeholder="Password *" value="" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class='label'>Confirm Password</label>
                                        <input type="password" class="form-control" id="confirmPassword"  name="confirmPassword" placeholder="Confirm Password *" value="" />
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
