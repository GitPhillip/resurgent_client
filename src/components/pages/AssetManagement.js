import React from 'react'
import { MDBDataTable } from 'mdbreact';

export default function AssetManagement() {

    const data = {

        columns: [
          {
            label: 'Asset ID',
            field: 'assetID',
            sort: 'asc',
          },
          {
            label: 'Asset Name',
            field: 'assetName',
            sort: 'asc',
          },
          {
            label: 'Customer Name',
            field: 'customerName',
            sort: 'asc',
          },
          {
            label: 'Asset Type',
            field: 'assetTypeID',
            sort: 'asc',
          },
          {
            label: 'Asset Device',
            field: 'assetDeviceID',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: [
          {
            assetID: 'Tiger Nixon',
            assetName: 'System Architect',
            customerName: 'Edinburgh',
            assetTypeID: '61',
            assetDeviceID: '61',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#assetDetailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            assetID: 'Cedric Kelly',
            assetName: 'Senior Javascript Developer',
            customerName: 'Edinburgh',
            assetTypeID: '22',
            assetDeviceID: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#assetDetailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            assetID: 'Airi Satou',
            assetName: 'Accountant',
            customerName: 'Tokyo',
            assetTypeID: '33',
            assetDeviceID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },

          {
            assetID: 'Charde Marshall',
            assetName: 'Regional Director',
            customerName: 'San Francisco',
            assetTypeID: '36',
            assetDeviceID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#assetDetailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            assetID: 'Haley Kennedy',
            assetName: 'Senior Marketing Designer',
            customerName: 'London',
            assetTypeID: '43',
            assetDeviceID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#assetDetailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            assetID: 'Tatyana Fitzpatrick',
            assetName: 'Regional Director',
            customerName: 'London',
            assetTypeID: '19',
            assetDeviceID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#assetDetailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
        ]
      };
    
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
                                        <MDBDataTable striped bordered data={data} />
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
                                            <select class='form-control' id='deviceAttachedModal' name='deviceAttachedModal'>
                                                <option hidden selected disabled>Please choose a device.</option>
                                                <option value='1'>Device 1</option>
                                                <option value='2'>Device 2</option>
                                                <option value='3'>Device 3</option>
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
