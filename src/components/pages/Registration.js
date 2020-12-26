import React from 'react'

export default function Registration() {
    return (
        <div class="row">
            <div class="col-md-12 ">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="customer-tab" data-toggle="tab" href="#customer" role="tab" aria-controls="customer" aria-selected="true">Register Customer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Register Admin</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                        <br/>
                        <h3 class="register-heading">Register Customer</h3>
                        <br/>
                        <div class="row register-form">
                    
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Customer Name</label>
                                            <input type="text" class="form-control" required='true' id="customerName" name="customerName" placeholder="Customer Name *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>Customer Email</label>
                                            <input type="email" class="form-control" required='true' id="customerEmail" name="customerEmail" placeholder="Customer Email *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Customer Telephone</label>
                                            <input type="text" maxlength="10" minlength="10" class="form-control" required='true' id="customerTelephone" name="customerTelephone" placeholder="Customer Telephone *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <label class='label'>Customer Notes</label>
                                        <textarea type='text' class='form-control' rows='3' id='customerNotes' name='customerNotes'>

                                        </textarea>
                                    </div>
                                </div>
                            </div>

                            <br/><br/>
                            <div class="col-md-2"></div>
                            <div class="col-md-3"></div>
                            <div class="col-md-7"><br/>
                                <div className='row'>
                                    <a href="/admin" class="btn btn-success btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-check"></i>
                                            </span>
                                            <span class="text">Save Changes</span>
                                    </a>
                                </div>
                            </div>
                        
                        </div>
                        <br/> <br/>
                    </div>

                    <div class="tab-pane fade show" id="admin" role="tabpanel" aria-labelledby="admin-tab">
                        <br/>
                        <h3  class="register-heading">Register Admin</h3>
                        <br/>
                        <div class="row register-form">
                    
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>First Name</label>
                                            <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Surname</label>
                                            <input type="text" class="form-control" id="surname" name="surname" placeholder="Surname *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>Email</label>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="Email *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Cellphone</label>
                                            <input type="text" maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>Username</label>
                                            <input type="text" class="form-control" id="userName"  name="userName" placeholder="User Name *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Admin User Type</label>
                                            <select class="form-control" id='userType' name='userType'>
                                                <option hidden selected disabled>Please select the admin type</option>
                                                <option value="1" >Admin</option>
                                                <option value="2" >Technician</option>
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
                                    <a href="/admin" class="btn btn-success btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-check"></i>
                                            </span>
                                            <span class="text">Save Changes</span>
                                    </a>
                                </div>
                            </div>
                        
                        </div>
                        <br/> <br/>
                    </div>

                </div>
            </div>
        </div>
    )
}
