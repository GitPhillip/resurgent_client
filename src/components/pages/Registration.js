import React from 'react'
import Swal from 'sweetalert2'

export default function Registration() {

    //*************Functions*************** */

    //Register Customer Function
    let registerCustomer = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Customer?',
            text: 'Are you sure you want to register the customer?',
            showCancelButton: true,
            confirmButtonText: `Register`
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            } else if (result.isDismissed) {

              Swal.fire('Admin not registered.', '', 'info')
            }
          });
    }

    //Register Employee Function
    let registerEmployee = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Employee?',
            text: 'Are you sure you want to register the employee?',
            showCancelButton: true,
            confirmButtonText: `Register Employee`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Employee Registered!', '', 'success');

            } else if (result.isDismissed) {

              Swal.fire('Employee was not registered.', '', 'info')
            }
          });
    }

    return (
        <div class="row">
            <div class="col-md-12 ">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="customer-tab" data-toggle="tab" href="#customer" role="tab" aria-controls="customer" aria-selected="true">Register Customer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Register Employee</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                        <br/>
                        <h3 class="register-heading">Register Customer</h3>
                        <br/>
                        <form method='post' onSubmit={registerCustomer}>
                            <div class="row register-form">
                    
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Customer Name</label>
                                                <input type="text" class="form-control" required='true' id="customerName" name="customerName" placeholder="Customer Name *" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Customer Email</label>
                                                <input type="email" class="form-control" required='true' id="customerEmail" name="customerEmail" placeholder="Customer Email *" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Customer Telephone</label>
                                                <input type="text" maxlength="10" minlength="10" class="form-control" required='true' id="customerTelephone" name="customerTelephone" placeholder="Customer Telephone *"  />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Customer Notes</label>
                                                <textarea type='text' class='form-control' rows='3' id='customerNotes' name='customerNotes'>

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
                                                <span class="text">Register Customer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                        <br/> <br/>
                    </div>

                    <div class="tab-pane fade show" id="admin" role="tabpanel" aria-labelledby="admin-tab">
                        <br/>
                        <h3  class="register-heading">Register Admin</h3>
                        <br/>
                        <form method='post' onSubmit={registerEmployee}>
                            <div class="row register-form">

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Username</label>
                                                    <input required='required' type="text" class="form-control" id="username" name="username" placeholder="Username *" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>First Name</label>
                                                <input required='required' type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name *"  />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Surname</label>
                                                <input required='required' type="text" class="form-control" id="surname" name="surname" placeholder="Surname *" />
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
                                            <div class="col-md-12">
                                                <label class='label'>Admin User Type</label>
                                                <select required='required' class="form-control" id='userType' name='userType'>
                                                    <option hidden selected disabled>Please select the employee type.</option>
                                                    <option value="ADMIN" >Admin</option>
                                                    <option value="TECHNICIAN" >Technician</option>
                                                </select>
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
                                                <span class="text">Register Employee</span>
                                        </button>
                                    </div>
                                </div>
                            
                            </div>
                        </form>
                        <br/> <br/>
                    </div>

                </div>
            </div>
        </div>
    )
}
