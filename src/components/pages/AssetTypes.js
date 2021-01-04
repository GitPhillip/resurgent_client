import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';
import { addAssetType } from '../slices/typeSlice';

export default function AssetTypes({assetTypeState}) {

    let data;

    //Get the global state
    let assetTypesState = assetTypeState.assetTypes;

    //Handle the states
    //----------Asset types registration----------------
    const [type_alias, setAssetTypeAlias] = useState('');
    const [type_description, setTypeDescription] = useState('');

    //Onchange handlers
    const onTypeAliasChange = e => setAssetTypeAlias(e.target.value);
    const onTypeDescriptionChange = e => setTypeDescription(e.target.value);

    //Dispatch to update the global state
    const dispatch = useDispatch();

    //***********Functions************ */

    //Register Asset Function
    let registerAssetType = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Asset?',
            text: 'Are you sure you want to register the asset type?',
            showCancelButton: true,
            confirmButtonText: `Register Asset Type`,
          }).then((result) => {
            if (result.isConfirmed) {
              
                //Send the api request
                api.post('/assettypes',{
                    type_alias,
                    type_description
                }).then(function (response){

                    //dispatch to update the state
                    dispatch(
                        addAssetType({
                            type_id: response.data.data.type_id,
                            type_alias,
                            type_description,
                            deleted:response.data.data.deleted

                        })
                    )

                    //Trigger the swal
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: `Asset type has been added with alias: ${response.data.data.type_alias}`
                    });

                    //clear all the input fields
                    setAssetTypeAlias('');
                    setTypeDescription('');

                }).catch(function(error){
                    if(error.response && error.response.data){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${error.response.data.error}`
                        });
                    }
                    
                });

            } 
          });
    }

    let viewAssetTypeDetails = (e) =>{
        
        //Get the customer id
        var assetTypeId = e.target.getAttribute('data-id');

        //Send the axios request
        api.get('/assettypes/'+assetTypeId)
        .then(response => {
            //populate the html elements accordingly
            document.getElementById('assetTypeAliasModal').value = response.data.data.type_alias;
            document.getElementById('assetDescriptionModal').value = response.data.data.type_description;

        });
    }

    //Update Asset Function
    let updateAssetType = (e) =>{
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
    let dataRows = JSON.parse(JSON.stringify(assetTypesState));

    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){
        
        //Replace the asset type id with the asset type alias

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button  type="button" class="btn btn-success btn-sm" onClick={viewAssetTypeDetails} data-id={dataRows[i]['type_id']} data-toggle="modal" data-target="#assetTypeDetailsModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details 
                </button>
            </div>
        )
    }

    data = {

        columns: [
          {
            label: 'Asset Type ID',
            field: 'type_id',
            sort: 'asc',
          },
          {
            label: 'Asset Type Alias',
            field: 'type_alias',
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
                            <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Asset Type</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Asset Types</a>
                        </li>
                        
                    </ul>

                
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <br/>
                            <h3 class="register-heading">Register Asset Type</h3>
                            <br/>
                            <form method='post' onSubmit={registerAssetType}>
                                <div class="row register-form">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Asset Type Alias</label>
                                                    <input required='required' type="text" class="form-control" id="assetAlias" 
                                                     name="assetAlias" placeholder="Asset Type Alias *"
                                                     value={type_alias}
                                                     onChange={onTypeAliasChange} />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Asset Type Description</label>
                                                    <textarea required='required' rows='4' type="text" class="form-control" id="assetTypeDescription" 
                                                     name="assetTypeDescription" placeholder="Asset Type Description *" 
                                                     value={type_description}
                                                     onChange={onTypeDescriptionChange}>
                                                     </textarea>
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
                                                    <span class="text">Register Asset Type</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br/> <br/>
                        </div>

                        <div class="tab-pane fade show" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                            <br/>
                            <h3  class="register-heading">Manage Asset Types</h3>
                            <br/>
                            
                            {/*<!-- DataTales Example -->*/}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">All Asset Types</h6>
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
            <div class="modal fade" id="assetTypeDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Asset Type Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method='post' onSubmit={updateAssetType}>
                            <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Type Alias</label>
                                                <input required='required' type="text" class="form-control" id="assetTypeAliasModal" name="assetTypeAliasModal" placeholder="Asset Type Alias *"  />
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
