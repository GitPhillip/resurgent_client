import React from 'react'
import { MDBDataTable } from 'mdbreact';
import {Redirect} from 'react-router-dom'

//Reducers
import {useSelector} from 'react-redux';

//api
import api from '../../api/api';

export default function CustomerDevices({customerState,assetState,deviceState,deviceTypeState, assetTypeState}) {
    

    //Ensure the user logged in is a company user
    const user = useSelector(state => state.user.user);
    //if the company id is not there
    if(user.user_company_id === undefined){
        return <Redirect to='/' />
    }

    let isDeviceTypesLoading = deviceTypeState.isLoading;

    //Function to view device details
    //View Device Details Function
    let viewDeviceDetails = (e) =>{
        //Prevent form from submitting to the actual file
        //Get the customer id
        var deviceId = e.target.getAttribute('data-id');

         //let assetId;
         let deviceHistory;
         let strDeviceHistory = "";

        if(isNaN(deviceId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

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
                document.getElementById('sigfoxIdModal').value = response.data.data.sigfox_id;
                document.getElementById('deviceStatusModal').value = response.data.data.device_status;
                document.getElementById('packetDataModal').value = response.data.data.device_pac;

                //Sort out the customer name and device match
                //assetId = response.data.data.asset_id;
                /*customerState.customers.map(customer => { 

                    assetState.assets.map(asset =>{
                        if(asset.asset_id ===assetId)
                        {
                            if(asset.customer_id === customer.customer_id){
                            document.getElementById('customerIdModal').value = customer.customer_name;
                            }
                        }return 'success'
                    })
                    return 'success'
                })*/
                

            });
        }
       
    }

    //loop through the assets and return those thaat belong to the session company
    const customerAssets = assetState.assets.filter(asset => asset.customer_id === user.user_company_id);

    //for all of those assets find the devices
    const customerDevices = deviceState.devices.filter( device => 
                customerAssets.find(asset => asset.asset_id === device.asset_id ));


    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(customerDevices));
    let deviceTypeRows = JSON.parse(JSON.stringify(deviceTypeState.deviceTypes));
    let assetRows = JSON.parse(JSON.stringify(customerAssets));

    //Add the action column
    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //loop through all the asset types
        for(var j = 0; j <deviceTypeRows.length; j++ ){

            if(deviceTypeRows[j]['type_id']===dataRows[i]['device_type_id'] )
                dataRows[i]['device_type_id'] = deviceTypeRows[j]['type_alias'];
            
        }

        //loop through all the assets
        for(var k = 0; k <assetRows.length; k++ ){

            if(assetRows[k]['asset_id']===dataRows[i]['asset_id'] )
                dataRows[i]['asset_id'] = assetRows[k]['asset_name'];
            
        }

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button type="button" class="btn btn-success btn-sm" onClick={viewDeviceDetails} data-id={dataRows[i]['device_id']} data-toggle="modal" data-target="#deviceModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details
                </button>
            </div>
        )
    }


    let data;

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
            label: 'Asset ID',
            field: 'asset_id',
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
                                                    <input  type="text" readonly='readonly' class="form-control" id="deviceIDModal" name="deviceIDModal" placeholder="Device ID *" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Device Type</label>
                                                    {!isDeviceTypesLoading ? (
                                                        <select readonly='readonly' class='form-control' id='deviceTypeIdModal' name='deviceTypeIdModal'>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {deviceTypeState.deviceTypes.map(deviceType => <option value={deviceType.type_id} >{deviceType.type_alias}</option>)}
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
                                                <div class="col-md-6">
                                                    <label class='label'>Asset ID</label>
                                                    <select readonly='readonly' class='form-control' id='assetIdModal' name='assetIdModal'>
                                                        <option hidden selected disabled>Please choose an asset.</option>
                                                        <option value='1'>Asset 1</option>
                                                        <option value='2'>Asset 2</option>
                                                        <option value='3'>Asset 3</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Sigfox ID</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="sigfoxIdModal" name="sigfoxIdModal" placeholder="Sigfox ID *"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class='label'>Device Status</label>
                                            <input class='form-control' readOnly='readonly' id='deviceStatusModal' name='deviceStatusModal' />
                                            
                                        </div>
                                    </div>


                                    <br/>
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

