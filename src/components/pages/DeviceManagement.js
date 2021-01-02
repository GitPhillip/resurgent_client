import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'
import api from '../../api/api';

export default function DeviceManagement({customerState,assetState,deviceState,deviceTypeState}) {
    
    let data;

    //Get the state
    let customersState = customerState.customers;
    let isLoading = customerState.isLoading;

    let assetsState = assetState.assets;
    let isAssetLoading = assetState.isLoading;

    let devicesState = deviceState.devices;

    let deviceTypesState = deviceTypeState.deviceTypes;
    let isDeviceTypesLoading = deviceTypeState.isLoading;

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

    //View Device Details Function
    let viewDeviceDetails = (e) =>{
        //Prevent form from submitting to the actual file
        //Get the customer id
        var deviceId = e.target.getAttribute('data-id');

        let assetId;
        let deviceHistory;
        let strDeviceHistory = "";

        //Will need to get this specific device history
        //Send the axios request
        api.get('/devicehistory/device/'+deviceId)
        .then(response =>{
            deviceHistory = response.data.data;
            deviceHistory.map(history =>{
               return strDeviceHistory += history.entry_content +'\n';
            })
            document.getElementById('deviceHistoryModal').value = strDeviceHistory;
        });
        
        //Send the axios request
        api.get('/devices/'+deviceId)
        .then(response => {
            //populate the html elements accordingly
            document.getElementById('deviceIDModal').value = `Device pac: ${response.data.data.device_pac}`;
            document.getElementById('assetIdModal').value =  response.data.data.asset_id;
            document.getElementById('deviceTypeIdModal').value = response.data.data.device_type_id;
            document.getElementById('sigfoxIDModal').value = response.data.data.sigfox_id;
            document.getElementById('deviceStatusModal').value = response.data.data.device_status;
            document.getElementById('packetDataModal').value = response.data.data.device_pac;

            //Sort out the customer name and device match
            assetId = response.data.data.asset_id;
            customersState.map(customer => { 

                assetsState.map(asset =>{
                    if(asset.asset_id ===assetId)
                    {
                        if(asset.customer_id === customer.customer_id){
                         document.getElementById('customerIdModal').value = customer.customer_name;
                        }
                    }return 'success'
                })
                return 'success'
            })
            

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

    let dataRows = JSON.parse(JSON.stringify(devicesState));
    let deviceTypeRows = JSON.parse(JSON.stringify(deviceTypesState));


    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        
        //loop through all the device types
        for(var k = 0; k <deviceTypeRows.length; k++ ){

            if(deviceTypeRows[k]['type_id']===dataRows[i]['device_type_id'] )
                dataRows[i]['device_type_id'] = deviceTypeRows[k]['type_alias'];
            
        }
        
        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button  type="button" class="btn btn-success btn-sm" data-id={dataRows[i].device_id} onClick={viewDeviceDetails} data-toggle="modal" data-target="#deviceModal">
                        <i class="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                </button>
            </div>
        )
    }

    data = {

        columns: [
          {
            label: 'Device ID',
            field: 'device_id',
            sort: 'asc',
          },
          {
            label: 'Device Type Alias',
            field: 'device_type_id',
            sort: 'asc',
          },
          {
            label: 'Sigfox ID',
            field: 'sigfox_id',
            sort: 'asc',
          },
          {
            label: 'Device Status',
            field: 'device_status',
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
                                                    {!isDeviceTypesLoading ? (
                                                        <select required='required' class='form-control' id='deviceTypeId' name='deviceTypeId'>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {deviceTypesState.map(deviceType => <option value={deviceType.type_id} >{deviceType.type_alias}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Device Asset</label>
                                                    {!isAssetLoading ? (
                                                        <select required='required' class='form-control' id='assetId' name='assetId'>
                                                            <option hidden selected disabled>Please choose an asset.</option>
                                                                {assetsState.map(asset => <option value={asset.asset_id} >{asset.asset_name}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Customer Name</label>
                                                    {!isLoading ? (
                                                        <select required='required' class='form-control' id='customerId' name='customerId'>
                                                            <option hidden selected disabled>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
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
                                                            {!isDeviceTypesLoading ? (
                                                            <select required='required' class='form-control' id='deviceTypeIdModal' name='deviceTypeIdModal'>
                                                                <option hidden selected disabled>Please choose a device type.</option>
                                                                {deviceTypesState.map(deviceType => <option value={deviceType.type_id} >{deviceType.type_alias}</option>)}
                                                            </select>
                                                        
                                                            )   : (<option>Loading...</option> )
                                                             }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label class='label'>Asset Name</label>
                                                            {!isAssetLoading ? (
                                                                <select required='required' class='form-control' id='assetIdModal' name='assetIdModal'>
                                                                    <option hidden selected disabled>Please choose an asset.</option>
                                                                        {assetsState.map(asset => <option value={asset.asset_id} >{asset.asset_name}</option>)}
                                                                </select>
                                                                
                                                                ) : (<option>Loading...</option> )
                                                            }
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
                                                    <select id='deviceStatusModal' class='form-control'>
                                                        <option hidden selected disabled>Please choose a asset type.</option>
                                                        <option value='IN USE'>IN USE</option>
                                                        <option value='BEING REPAIRED'>BEING REPAIRED</option>
                                                        <option value='DECOMMISSIONED'>DECOMMISSIONED</option>

                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class='label'>Customer Name</label>
                                                            <input  readonly='readonly' class='form-control' id='customerIdModal' />
                                                            
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
                                                            <textarea rows='8' readonly='readonly' class="form-control" id="deviceHistoryModal" name="deviceHistoryModal" placeholder="Device History *"  ></textarea>
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

