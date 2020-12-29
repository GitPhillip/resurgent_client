import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'

export default function TechnicianDeviceManagement() {
    
    let data;

    //***********Functions************* */

    //Register Device Function
    let registerDevice = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Device?',
            text: 'Are you sure you want to register the device?',
            showCancelButton: true,
            confirmButtonText: `Register`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Device Registered!', '', 'success');

            } 
          });
    }

    //Update Device Function
    let updateDevice = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Device?',
            text: 'Are you sure you want to update the device?',
            showCancelButton: true,
            confirmButtonText: `Update`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Device Updated!', '', 'success');

            } 
          });
    }

    data = {

        columns: [
          {
            label: 'Device ID',
            field: 'deviceID',
            sort: 'asc',
          },
          {
            label: 'Device Type Alias',
            field: 'deviceTypeID',
            sort: 'asc',
          },
          {
            label: 'Asset ID',
            field: 'assetID',
            sort: 'asc',
          },
          {
            label: 'Sigfox ID',
            field: 'sigfoxID',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: [
          {
            deviceID: 'Tiger Nixon',
            deviceTypeID: 'System Architect',
            assetID: 'Edinburgh',
            sigfoxID: '61',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceID: 'Cedric Kelly',
            deviceTypeID: 'Senior Javascript Developer',
            assetID: 'Edinburgh',
            sigfoxID: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceID: 'Airi Satou',
            deviceTypeID: 'Accountant',
            assetID: 'Tokyo',
            sigfoxID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },

          {
            deviceID: 'Charde Marshall',
            deviceTypeID: 'Regional Director',
            assetID: 'San Francisco',
            sigfoxID: '36',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceID: 'Haley Kennedy',
            deviceTypeID: 'Senior Marketing Designer',
            assetID: 'London',
            sigfoxID: '43',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceID: 'Tatyana Fitzpatrick',
            deviceTypeID: 'Regional Director',
            assetID: 'London',
            sigfoxID: '19',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceModal">
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
                            <form method='post' onSubmit={registerDevice}>
                                <div class="row register-form">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Device Type</label>
                                                    <select required='required' class='form-control' id='deviceTypeAlias' name='deviceTypeAlias'>
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
                                        <div class='row'>
                                            <button type='submit' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Register Device</span>
                                            </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </form>
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
                                         <MDBDataTable striped bordered data={data} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>

            </div>

            {/* Device Details Modal */}
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

                        <form method='post' onSubmit={updateDevice}>

                                <div id="deviceCarousel" class="carousel slide" data-interval="false">

                                    <ol class="carousel-indicators">
                                        <li data-target="#deviceCarousel" data-slide-to="0" class="active"></li>
                                        <li data-target="#deviceCarousel" data-slide-to="1"></li>
                                        <li data-target="#deviceCarousel" data-slide-to="2"></li>
                                    </ol>

                                    <div class="carousel-inner">
                        
                                        <div class="carousel-item active">

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Device ID</label>
                                                            <input type="text" readonly='readonly' required='required' class="form-control" id="deviceIDModal" name="deviceIDModal" placeholder="Device ID *" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class='label'>Device Type</label>
                                                            <select required='required' class='form-control' id="deviceTypeID" name="deviceTypeID">
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
                                                            <input type="text" readonly='readonly' class="form-control" id="sigfoxIDModal" name="sigfoxIDModal" placeholder="Sigfox ID *"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class='label'>Device Status</label>
                                                    <select class='form-control' id='deviceStatusModal' name='deviceStatusModal'>
                                                        <option hidden selected disabled>Please choose a device status.</option>
                                                        <option value='In use'>In use</option>
                                                        <option value='Being repaired'>Being repaired</option>
                                                        <option value='Decommissioned'>Decommissioned</option>
                                                    </select>
                                                        
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
                                                <br/>
                                            </div>
                                            
                                        </div>

                                        <div class="carousel-item">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class='label'>Device History</label>
                                                            <textarea rows='8' readonly='readonly' type="text" class="form-control" id="deviceHistoryModal" name="deviceHistoryModal" placeholder="Device History *" value="" ></textarea>
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
                                                            <textarea rows='8' readonly='readonly' type="text" class="form-control" id="packetDataModal" name="packetDataModal" placeholder="Packet Data *" value="" ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-lg-12 col-md-12 d-flex justify-content-between">
                                            <a class="left text-default btn btn-primary btn-sm" href="#deviceCarousel" role="button" data-slide="prev">
                                                <span>Previous Page</span>
                                            </a>

                                            <a class="right text-default btn btn-primary btn-sm" href="#deviceCarousel" role="button" data-slide="next">
                                                <span>Next Page</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-5"></div>
                                            <div class="col-md-7">
                                                <button type='submit' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Save Changes</span>
                                                </button>
                                            </div>
                                            <div class="col-md-2"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                        </form>
                        
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
            </div>
        </div>
        {/* Device Details Modal */}

        </React.Fragment>
    )
}

