import React from 'react'
import { MDBDataTable } from 'mdbreact';

export default function DeviceTypes() {

    const data = {

        columns: [
          {
            label: 'Device Type Alias',
            field: 'deviceTypeAlias',
            sort: 'asc',
          },
          {
            label: 'Conversion',
            field: 'conversion',
            sort: 'asc',
          },
          {
            label: 'Packet Structure',
            field: 'packetStructure',
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
            deviceTypeAlias: 'Tiger Nixon',
            conversion: 'System Architect',
            packetStructure: 'Edinburgh',
            sigfoxID: '61',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceTypeAlias: 'Cedric Kelly',
            conversion: 'Senior Javascript Developer',
            packetStructure: 'Edinburgh',
            sigfoxID: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceTypeAlias: 'Airi Satou',
            conversion: 'Accountant',
            packetStructure: 'Tokyo',
            sigfoxID: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },

          {
            deviceTypeAlias: 'Charde Marshall',
            conversion: 'Regional Director',
            packetStructure: 'San Francisco',
            sigfoxID: '36',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceTypeAlias: 'Haley Kennedy',
            conversion: 'Senior Marketing Designer',
            packetStructure: 'London',
            sigfoxID: '43',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            deviceTypeAlias: 'Tatyana Fitzpatrick',
            conversion: 'Regional Director',
            packetStructure: 'London',
            sigfoxID: '19',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#deviceTypeModal">
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
