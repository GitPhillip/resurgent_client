import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';

export default function DeviceTypes({deviceTypeState}) {

    let data;

    //Get the state
    let deviceTypesState = deviceTypeState.deviceTypes;

    //***********Functions************* */

    //Register Device Type Function
    let registerDeviceType = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Device Type?',
            text: 'Are you sure you want to register the device type?',
            showCancelButton: true,
            confirmButtonText: `Register`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Device Type Registered!', '', 'success');

            } 
          });
    }

    //View Device Type Function
    let viewDeviceType = (e) =>{
    
        //Get the id of the device type
        let deviceTypeId = e.target.getAttribute('data-id');

        //Send the axios request to the API
        //Send the axios request
        api.get('/devicetypes/'+deviceTypeId)
        .then(response =>{
            
            //Populate the correct html
            document.getElementById('deviceTypeAliasModal').value =response.data.data.type_alias;
            document.getElementById('deviceTypeConversionModal').value =response.data.data.type_conversion;
            document.getElementById('packetStructureModal').value =response.data.data.packet_structure;
            document.getElementById('sigfoxIDModal').value =response.data.data.sigfox_id;
            document.getElementById('deviceTypeDescriptionModal').value =response.data.data.type_description;

        });

    }

    //Update Device Type Function
    let updateDeviceType = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Device Type?',
            text: 'Are you sure you want to update the device type?',
            showCancelButton: true,
            confirmButtonText: `Update`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Device Type Updated!', '', 'success');

            } 
          });
    }

    let dataRows = JSON.parse(JSON.stringify(deviceTypesState));

    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button  type="button" class="btn btn-success btn-sm" data-id={dataRows[i].type_id} onClick={viewDeviceType} data-toggle="modal" data-target="#deviceTypeModal">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details
                </button>
            </div>
        )
       
    }

    data = {

        columns: [
          {
            label: 'Device Type Alias',
            field: 'type_alias',
            sort: 'asc',
          },
          {
            label: 'Conversion',
            field: 'type_conversion',
            sort: 'asc',
          },
          {
            label: 'Packet Structure',
            field: 'packet_structure',
            sort: 'asc',
          },
          {
            label: 'Sigfox ID',
            field: 'sigfox_id',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: dataRows
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
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Device Type</h3>
                            <br/>
                            <form method='post' onSubmit={registerDeviceType}>
                                <div class="row register-form">

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Device Type Alias</label>
                                                    <input required='required' class='form-control' id='deviceTypeAlias' name='deviceTypeAlias' placeholder="Device Type Alias*" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row col-md-12">
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
                                            <button type='submit' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Register Asset</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
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
                        <form method='post' onSubmit={updateDeviceType}>
                            <div class="row register-form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device Type Alias</label>
                                                <input required='required' class='form-control' id='deviceTypeAliasModal' name='deviceTypeAliasModal' placeholder="Device Type Alias*" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                            <label class='label'>Device Type Conversion</label>
                                                <input required='required' readonly='readonly' type='text' class='form-control' id='deviceTypeConversionModal' name='deviceTypeConversionModal' placeholder="Device Type Conversion *" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Packet Structure</label>
                                                <input required='required' readonly='readonly' type="text" class="form-control" id="packetStructureModal" name="packetStructureModal" placeholder="Packet Structure *"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Sigfox ID</label>
                                                <input required='required' readonly='readonly' type='text' class='form-control' id='sigfoxIDModal' name='sigfoxIDModal' placeholder="Sigfox ID *" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device Type Description</label>
                                                <textarea rows='4' type="text" class="form-control" id="deviceTypeDescriptionModal" name="deviceTypeDescriptionModal" placeholder="Device Type Description *"  ></textarea>
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
                                                <span class="text">Save Changes</span>
                                        </button>
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
        {/* Device Type Details Modal */}

    </React.Fragment>
    )
}
