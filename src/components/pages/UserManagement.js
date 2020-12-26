import React from 'react'

export default function UserManagement() {

    return (

        <React.Fragment>
            {/*<!-- Page Heading -->*/}
            <h1 class="h3 mb-2 text-gray-800">All Users</h1>
            <br/>
            {/*<!-- DataTales Example -->*/}
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">All Resurgent Users</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Names</th>
                                    <th>Email</th>
                                    <th>Cellphone</th>
                                    <th>User Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Names</th>
                                    <th>Email</th>
                                    <th>Cellphone</th>
                                    <th>User Type</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td>Suki Burks</td>
                                    <td>Developer</td>
                                    <td>London</td>
                                    <td>53</td>
                                    <td>
                                        <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Prescott Bartlett</td>
                                    <td>Technical Author</td>
                                    <td>London</td>
                                    <td>27</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Lael Greer</td>
                                    <td>Systems Administrator</td>
                                    <td>London</td>
                                    <td>21</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jonas Alexander</td>
                                    <td>Developer</td>
                                    <td>San Francisco</td>
                                    <td>30</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shad Decker</td>
                                    <td>Regional Director</td>
                                    <td>Edinburgh</td>
                                    <td>51</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Michael Bruce</td>
                                    <td>Javascript Developer</td>
                                    <td>Singapore</td>
                                    <td>29</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Donna Snider</td>
                                    <td>Customer Support</td>
                                    <td>New York</td>
                                    <td>27</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ----------- Admin Modal---------- */}

            <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Admin Details</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="row">

                            <div class="col-md-12 ">

                                <h3 id="userName" name="userName" class="register-heading" >Douglas' profile:</h3>
                                <br/>
                                <div class="row register-form">

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>First Name</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="firstName" name="firstName" placeholder="First Name *" value="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Surname</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="surname" name="surname" placeholder="Surname *" value="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Email</label>
                                                    <input type="email" readonly='readonly' class="form-control" id="email" name="email" placeholder="Email *" value="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Cellphone</label>
                                                    <input type="text" readonly='readonly' maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" value="" />
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

                                
                                </div>
                                
                            </div>

                            </div>

                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------- End Admin Modal---------- */}

        </React.Fragment>
    )
}
