import React from 'react'

export default function DeviceManagement() {
    
    return (

        <React.Fragment>
        <div class="row">
                <div class="col-md-12 ">
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Device</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Devices</a>
                        </li>
                        
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Device</h3>
                            <br/>
                            <div class="row register-form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Device Type</label>
                                                <select class='form-control' id='deviceTypeID' name='deviceTypeID'>
                                                    <option hidden selected disabled>Please select a device type.</option>
                                                    <option value='1'>Type 1</option>
                                                    <option value='2'>Type 2</option>
                                                    <option value='3'>Type 3</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Device Asset</label>
                                                <select class='form-control' id='assetID' name='assetID'>
                                                    <option hidden selected disabled>Please select an asset.</option>
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
                            <h3  class="register-heading">Manage Devices</h3>
                            <br/>
                            
                            {/*<!-- DataTales Example -->*/}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">All Devices</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Device ID</th>
                                                <th>Device Type</th>
                                                <th>Sigfox ID</th>
                                                <th>Asset ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Device ID</th>
                                                <th>Device Type</th>
                                                <th>Sigfox ID</th>
                                                <th>Asset ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            
                                            <tr>
                                                <td>Suki Burks</td>
                                                <td>Developer</td>
                                                <td>London</td>
                                                <td>53</td>
                                                <td><button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                                                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#deviceModal">
                                                            <i class="fas fa-tablet-alt "></i>{" "}
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
                        
                    </div>
                </div>

            </div>

            {/* Device Type Details Modal */}
            <div class="modal fade" id="deviceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Device Details</h5>
                        
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="register-form">

                            <div id="companyCarousel" class="carousel slide" data-interval="false">
                            
                                <ol class="carousel-indicators text-info">
                                    <li data-target="#companyCarousel" data-slide-to="0" class="active"></li>
                                    <li data-target="#companyCarousel" data-slide-to="1"></li>
                                    <li data-target="#companyCarousel" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">

                                    <div class="carousel-item active">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class='label'>Device ID</label>
                                                        <input type="text" class="form-control" id="deviceIDModal" name="deviceIDModal" placeholder="Device ID *" value="" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class='label'>Device Type</label>
                                                        <select class='form-control' id="deviceTypeID" name="deviceTypeID">
                                                            <option hidden selected disabled>Please choose a device type.</option>
                                                            <option value='1'>Asset 1</option>
                                                            <option value='2'>Asset 2</option>
                                                            <option value='3'>Asset 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class='label'>Asset ID</label>
                                                        <select class='form-control' id='assetIDModal' name='assetIDModal'>
                                                            <option hidden selected disabled>Please choose an asset.</option>
                                                            <option value='1'>Asset 1</option>
                                                            <option value='2'>Asset 2</option>
                                                            <option value='3'>Asset 3</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class='label'>Sigfox ID</label>
                                                        <input type="text" class="form-control" id="sigfoxIDModal" name="sigfoxIDModal" placeholder="Asset Name *" value="" />
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
                                        
                                    </div>

                                    <div class="carousel-item">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <label class='label'>Device History</label>
                                                        <textarea rows='8' type="text" class="form-control" id="deviceHistoryModal" name="deviceHistoryModal" placeholder="Device History *" value="" ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="carousel-item">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <label class='label'>Packet Data</label>
                                                        <textarea rows='8' type="text" class="form-control" id="packetDataModal" name="packetDataModal" placeholder="Packet Data *" value="" ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-12 col-lg-12 col-md-12 d-flex justify-content-between">
                                        <a class="left text-default btn btn-primary btn-sm" href="#companyCarousel" role="button" data-slide="prev">
                                            <span>Previous Page</span>
                                        </a>

                                        <a class="right text-default btn btn-primary btn-sm" href="#companyCarousel" role="button" data-slide="next">
                                            <span>Next Page</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            <div class='justify-content-between'>
                            
                                <a href="/admin" class="btn btn-success btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-check"></i>
                                        </span>
                                        <span class="text">Save Changes</span>
                                </a>

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

