import React from 'react'

export default function DeviceTypes() {
    return (
        <React.Fragment>

            <div class="row">
                <div class="col-md-12 ">
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Device Type</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Device Types</a>
                        </li>
                        {/* <!--<li class="nav-item">--> 
                            <a class="nav-link" id="technician-tab" data-toggle="tab" href="#technician" role="tab" aria-controls="technician" aria-selected="false">Register Technician</a>
                        </li>*/}
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Device Type</h3>
                            <br/>
                            <div class="row register-form">

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device Type Alias</label>
                                                <input class='form-control' id='deviceTypeAlias' name='deviceTypeAlias' placeholder="Device Type Alias*" value="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row col-md-1"></div>
                                        <div class="row col-md-11">
                                            <label class='label'>Device Type description</label>
                                            <textarea type='text' class='form-control' rows='4' id='deviceTypeDescription' name='deviceTypeDescription'>

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

                        <div class="tab-pane fade show" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                            <br/>
                            <h3  class="register-heading">Manage Device Types</h3>
                            <br/>
                            
                            {/*<!-- DataTales Example -->*/}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Device Types Table</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Device Alias</th>
                                                    <th>Conversion</th>
                                                    <th>Packet Structure</th>
                                                    <th>Sigfox ID</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Device Alias</th>
                                                    <th>Conversion</th>
                                                    <th>Packet Structure</th>
                                                    <th>Sigfox ID</th>
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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
                                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceTypeModal">
                                                            <i class="fas fa-cog "></i>{" "}
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

            {/* Device Type Details Modal */}
            <div class="modal fade" id="deviceTypeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Device Type Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row register-form">

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Device Type Alias</label>
                                            <input class='form-control' id='deviceTypeAliasModal' name='deviceTypeAliasModal' placeholder="Device Type Alias*" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                        <label class='label'>Device Type Conversion</label>
                                            <input class='form-control' id='deviceTypeConversionModal' name='deviceTypeConversionModal' placeholder="Device Type Conversion *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Packet Structure</label>
                                            <input type="text" class="form-control" id="packetStructureModal" name="packetStructureModal" placeholder="Packet Structure *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Sigfox ID</label>
                                            <input class='form-control' id='sigfoxIDModal' name='sigfoxIDModal' placeholder="Sigfox ID *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Device Type Description</label>
                                            <textarea rows='4' type="text" class="form-control" id="deviceTypeDescriptionModal" name="deviceTypeDescriptionModal" placeholder="Device Type Description *" value="" ></textarea>
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
        {/* Device Type Details Modal */}

    </React.Fragment>
    )
}
