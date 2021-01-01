import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'

export default function AssetManagement({customerState,assetState, assetTypeState}) {

    let data;

    //Get the state
    let customersState = customerState.customers;
    let isLoading = customerState.isLoading

    let assetsState = assetState.assets;

    let assetTypesState = assetTypeState.assetTypes;
    let IsLoadingAssestTypes = assetTypeState.isLoading;

    //***********Functions************ */

    //Register Asset Function
    let registerAsset = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Asset?',
            text: 'Are you sure you want to register the asset?',
            showCancelButton: true,
            confirmButtonText: `Register Asset`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Asset Registered!', '', 'success');

            } else if (result.isDismissed) {

              Swal.fire('Asset was not registered.', '', 'info')
            }
          });
    }

    //Update Asset Function
    let updateAsset = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Asset?',
            text: 'Are you sure you want to update the asset?',
            showCancelButton: true,
            confirmButtonText: `Update Asset`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

              Swal.fire('Asst updated!', '', 'success');

            } 
          });
    }

    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(assetsState));
    let customerRows = JSON.parse(JSON.stringify(customersState));
    let assetTypeRows = JSON.parse(JSON.stringify(assetTypesState))
    
    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //Replace the customer id with the customer name

        //loop through all the customers
        for(var k = 0; k <customerRows.length; k++ ){

            if(customerRows[k]['customer_id']===dataRows[i]['customer_id'] )
                dataRows[i]['customer_id'] = customerRows[k]['customer_name'];
            
        }
        
        //Replace the asset type id with the asset type alias

        //loop through all the asset types
        for(var j = 0; j <assetTypeRows.length; j++ ){

            if(assetTypeRows[j]['type_id']===dataRows[i]['asset_type_id'] )
                dataRows[i]['asset_type_id'] = assetTypeRows[j]['type_alias'];
            
        }

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button  type="button" class="btn btn-success btn-sm" data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#assetDetailsModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details 
                </button>
            </div>
        )
    }

    data = {

        columns: [
          {
            label: 'Asset ID',
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Asset Name',
            field: 'asset_name',
            sort: 'asc',
          },
          {
            label: 'Customer Name',
            field: 'customer_id',
            sort: 'asc',
          },
          {
            label: 'Asset Type',
            field: 'asset_type_id',
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
                            <form method='post' onSubmit={registerAsset}>
                                <div class="row register-form">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Asset Name</label>
                                                    <input required='required' type="text" class="form-control" id="assetName" name="assetName" placeholder="Asset Name *" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Asset Type</label>
                                                    {!IsLoadingAssestTypes ? (
                                                        <select required='required' class='form-control' id='customerID' name='customerID'>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {assetTypesState.map(assetType => <option value={assetType.type_id} >{assetType.type_alias}</option>)}
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
                                                        <select required='required' class='form-control' id='customerID' name='customerID'>
                                                            <option hidden selected disabled>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
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
                                                    <label class='label'>Asset Description</label>
                                                    <textarea required='required' rows='4' type="text" class="form-control" id="assetDescription" name="assetDescription" placeholder="Asset Description *" ></textarea>
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
                        <form method='post' onSubmit={updateAsset}>
                            <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Asset Name</label>
                                                <input required='required' type="text" class="form-control" id="assetNameModal" name="assetNameModal" placeholder="Asset Name *"  />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                <select required='required' class='form-control' id='assetTypeModal' name='assetTypeModal'>
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
                                                {!isLoading ? (
                                                        <select required='required' class='form-control' id='customerIDModal' name='customerIDModal'>
                                                            <option hidden selected disabled>Please choose a customer.</option>
                                                            {customersState.map(customer => <option value={customer.customer_id} >{customer.customer_name}</option>)}
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
                                                <label class='label'>Device Attached</label>
                                                <input class='form-control' id='deviceIDModal' name='deviceIDModal' placeholder='Device Attached *'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Description</label>
                                                <textarea rows='4' type="text" class="form-control" id="assetDescriptionModal" name="assetDescriptionModal" placeholder="Asset Description *"  ></textarea>
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
        {/* End Asset Details Modal */}

    </React.Fragment>
    )
}
