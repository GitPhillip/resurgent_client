import React from 'react'

export default function AdminProfile() {
    return (
        <div class="row">

            <div class="col-md-12 ">
                <br/>
                <h3 id="userName" name="userName" class="register-heading" >Hi Douglas, here's your profile:</h3>
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
                            <div class="row col-md-1"></div>
                            <div class="row col-md-11">
                                <label class='label'>User Type description</label>
                                <textarea type='text' readonly='readonly' class='form-control' rows='4' id='userTypeDescription' name='userTypeDescription'>

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
                <br/> <br/> <br/> <br/> <br/>

            </div>

        </div>
    )
}
