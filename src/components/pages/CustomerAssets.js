import React from 'react'
import { MDBDataTable } from 'mdbreact';

export default function CustomerAssets() {

    let data;
    //***********Functions************ */

    data = {

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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                        <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
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
                                                <input readonly='readonly' type="text" class="form-control" id="assetNameModal" name="assetNameModal" placeholder="Asset Name *"  />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                <select readonly='readonly' class='form-control' id='assetTypeModal' name='assetTypeModal'>
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
                                                <label class='label'>Company Name</label>
                                                <select readonly='readonly' class='form-control' id='customerNameModal' name='customerNameModal'>
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
                                                <select readonly='readonly' class='form-control' id='deviceAttachedModal' name='deviceAttachedModal'>
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
                                                <textarea  readonly='readonly' rows='4' type="text" class="form-control" id="assetDescriptionModal" name="assetDescriptionModal" placeholder="Asset Description *"  ></textarea>
                                            </div>
                                        </div>
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
