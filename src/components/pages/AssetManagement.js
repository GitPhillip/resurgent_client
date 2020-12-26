import React from 'react'

export default function AssetManagement() {
    
    return (

        <React.Fragment>

            <div class="row">
                <div class="col-md-12 ">
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Asset</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Assets</a>
                        </li>
                        
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Asset</h3>
                            <br/>
                            <div class="row register-form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Asset Name</label>
                                                <input type="text" class="form-control" id="assetName" name="assetName" placeholder="Asset Name *" value="" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                <select class='form-control' id='assetType' name='assetType'>
                                                    <option hidden selected disabled>Please select a asset type.</option>
                                                    <option value='1'>Truck</option>
                                                    <option value='2'>Trailer</option>
                                                    <option value='3'>Car</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Customer Name</label>
                                                <select class='form-control' id='customerID' name='customerID'>
                                                    <option hidden selected disabled>Please choose a customer.</option>
                                                    <option value='1'>Shoprite</option>
                                                    <option value='2'>Coca Cola</option>
                                                    <option value='3'>Checkers</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Description</label>
                                                <textarea rows='4' type="text" class="form-control" id="assetDescription" name="assetDescription" placeholder="Asset Description *" value="" ></textarea>
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

                        <div class="tab-pane fade show" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                            <br/>
                            <h3  class="register-heading">Manage Assets</h3>
                            <br/>
                            
                            {/*<!-- DataTales Example -->*/}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">All Assets</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Asset ID</th>
                                                    <th>Asset Name</th>
                                                    <th>Customer Name</th>
                                                    <th>Asset Type</th>
                                                    <th>Asset Device(s)</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Asset ID</th>
                                                    <th>Asset Name</th>
                                                    <th>Customer Name</th>
                                                    <th>Asset Type</th>
                                                    <th>Asset Device(s)</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                
                                                <tr>
                                                    <td>Suki Burks</td>
                                                    <td>Suki Burks</td>
                                                    <td>Developer</td>
                                                    <td>Developer</td>
                                                    <td>London</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Prescott Bartlett</td>
                                                    <td>Technical Author</td>
                                                    <td>Prescott Bartlett</td>
                                                    <td>Technical Author</td>
                                                    <td>London</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Lael Greer</td>
                                                    <td>Systems Administrator</td>
                                                    <td>Lael Greer</td>
                                                    <td>Systems Administrator</td>
                                                    <td>London</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Jonas Alexander</td>
                                                    <td>Developer</td>
                                                    <td>Jonas Alexander</td>
                                                    <td>Developer</td>
                                                    <td>San Francisco</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Shad Decker</td>
                                                    <td>Regional Director</td>
                                                    <td>Shad Decker</td>
                                                    <td>Regional Director</td>
                                                    <td>Edinburgh</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Michael Bruce</td>
                                                    <td>Javascript Developer</td>
                                                    <td>Michael Bruce</td>
                                                    <td>Javascript Developer</td>
                                                    <td>Singapore</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Michael Bruce</td>
                                                    <td>Javascript Developer</td>
                                                    <td>Michael Bruce</td>
                                                    <td>Javascript Developer</td>
                                                    <td>New York</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#assetDetailsModal">
                                                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                                                        View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="tab-pane fade show" id="technician" role="tabpanel" aria-labelledby="technician-tab">
                            <br/>
                            <h3  class="register-heading">Register Technician</h3>
                            <br/>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="First Name *" value="" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Email *" value="" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" maxlength="10" minlength="10" class="form-control" placeholder="Phone *" value="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password *" value="" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Confirm Password *" value="" />
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control">
                                            <option class="hidden"  selected disabled>Please select your Sequrity Question</option>
                                            <option>What is your Birthdate?</option>
                                            <option>What is Your old Phone Number</option>
                                            <option>What is your Pet Name?</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="`Answer *" value="" />
                                    </div>
                                    
                                </div>
                                <div class="row col-md-12">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-3"></div>
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

            {/* Asset Details Modal */}
            <div class="modal fade" id="assetDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Asset Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row register-form">
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>Asset Name</label>
                                            <input type="text" class="form-control" id="assetNameModal" name="assetNameModal" placeholder="Asset Name *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Asset Type</label>
                                            <select class='form-control' id='assetTypeModal' name='assetTypeModal'>
                                                <option hidden selected disabled>Please select a asset type.</option>
                                                <option value='1'>Truck</option>
                                                <option value='2'>Trailer</option>
                                                <option value='3'>Car</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Customer Name</label>
                                            <select class='form-control' id='customerIDModal' name='customerIDModal'>
                                                <option hidden selected disabled>Please choose a customer.</option>
                                                <option value='1'>Shoprite</option>
                                                <option value='2'>Coca Cola</option>
                                                <option value='3'>Checkers</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Devices Attached</label>
                                            <input class='form-control' id='deviceAttachedModal' name='deviceAttachedModal' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Asset Description</label>
                                            <textarea rows='4' type="text" class="form-control" id="assetDescriptionModal" name="assetDescriptionModal" placeholder="Asset Description *" value="" ></textarea>
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
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
            </div>
        </div>
        {/* End Asset Details Modal */}

    </React.Fragment>
    )
}
