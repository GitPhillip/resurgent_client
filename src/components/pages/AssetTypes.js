import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';
import { addAssetType,updateAssetType, deleteAssestType } from '../slices/typeSlice';

export default function AssetTypes({assetTypeState}) {

    let data;

    //Get the global state
    let assetTypesState = assetTypeState.assetTypes;
    let user = useSelector(state => state.user.user);


    //----------Asset types registration----------------
    //Handle the states
    const [type_alias, setAssetTypeAlias] = useState('');
    const [type_description, setTypeDescription] = useState('');

    //Onchange handlers
    const onTypeAliasChange = e => setAssetTypeAlias(e.target.value);
    const onTypeDescriptionChange = e => setTypeDescription(e.target.value);


    //--------------Asset Type Updates------------------

    const [type_aliasModal, setAssetTypeAliasModal] = useState('');
    const [type_descriptionModal, setTypeDescriptionModal] = useState('');
    const onTypeAliasModalChange = e => setAssetTypeAliasModal(e.target.value);
    const onTypeDescriptionModalChange = e => setTypeDescriptionModal(e.target.value);

    //Dispatch to update the global state
    const dispatch = useDispatch();

    //use Effect to update changes here
    useEffect(() => {
        
    }, [assetTypesState])

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

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Asset Type Reg: User (ID: ${user.user_id}) registered an asset type with name ${type_alias} (ID: ${response.data.data.type_id}).`;
                    api.post('/systemlog',{
                        user_id: user.user_id,
                        entry_content})
                    .then()
                    .catch(error =>{
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
                    //***************SYSTEM LOG********************* */
                    //********************************************** */

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
        
        //Get the asset type Id id
        var assetTypeId = e.target.getAttribute('data-id');
        if(assetTypeId !== null)
        {
            //Adjust the update button data-id of the button 
            document.getElementById('btnUpdateAssetType').setAttribute('data-id', assetTypeId);
        }

        //const existingAssetType = assetTypesState.find(assetType => assetType.type_id ===assetTypeId)

        //Send the axios request
        api.get('/assettypes/'+assetTypeId)
        .then(response => {
            //populate the html elements accordingly
            document.getElementById('assetTypeAliasModal').value = response.data.data.type_alias;
            document.getElementById('assetDescriptionModal').value = response.data.data.type_description;

            //set the state of the inputs
            setAssetTypeAliasModal(response.data.data.type_alias);
            setTypeDescriptionModal(response.data.data.type_description)


        });
    }

    //Update Asset Function
    let updateAssetTypeChanges = (e) =>{
        
        //Prevent the form submitting
        e.preventDefault();
        
        //Get the asset type id
        var assetTypeId = parseInt(document.getElementById('btnUpdateAssetType').getAttribute('data-id'));

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Update Asset Type?',
            text: 'Are you sure you want to update the asset type?',
            showCancelButton: true,
            confirmButtonText: `Update`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

                //Send the api request
                api.put(`/assettypes/${assetTypeId}`,{
                    type_alias: type_aliasModal,
                    type_description: type_descriptionModal
                }).then(function (response){

                    //dispatch to update the state
                    dispatch(
                        updateAssetType({
                            type_id: assetTypeId,
                            type_alias: type_aliasModal,
                            type_description: type_descriptionModal,
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Asset Type Update: User (ID: ${user.user_id}) edited an asset type with name ${type_aliasModal} (ID: ${assetTypeId}). `;
                    api.post('/systemlog',{
                        user_id: user.user_id,
                        entry_content})
                    .then()
                    .catch(error =>{
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
                    //***************SYSTEM LOG********************* */
                    //********************************************** */

                    //Trigger the swal
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: `${response.data.message}.`
                    });

                    //clear all the input fields
                    setAssetTypeAliasModal('');
                    setTypeDescriptionModal('');

                    //Close the modal
                    document.getElementById('assetTypeDetailsModal').click();

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

    //Delete Asset Type Function
    let deleteOneAssetType = (e) =>{
        
        //Prevent the form submitting
        //e.preventDefault();
        
        //Get the asset type id
        var assetTypeId = parseInt(e.target.getAttribute('data-id'));

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Delete Asset Type?',
            text: 'Are you sure you want to delete the asset type?',
            showCancelButton: true,
            confirmButtonText: `Delete`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request

                //Send the api request
                api.delete(`/assettypes/${assetTypeId}`)
                .then(function (response){
                    //dispatch to update the state
                    dispatch(
                        deleteAssestType({
                            type_id: assetTypeId
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Asset Type Delete: User (ID: ${user.user_id}) deleted an asset type with name ${response.data.type_alias} (ID: ${assetTypeId}). `;
                    api.post('/systemlog',{
                        user_id: user.user_id,
                        entry_content})
                    .then()
                    .catch(error =>{
                        if(error.response && error.response.data){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${error.response.data.error}`
                            });
                        }
                    });
                    //***************SYSTEM LOG********************* */
                    //********************************************** */

                    //Trigger the swal
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${response.data.message}`
                    });

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
                </button> {' '}
                <button  type="button" class="btn btn-danger btn-sm" onClick={deleteOneAssetType} data-id={dataRows[i]['type_id']} >
                    <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                    Delete
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
                            <a class="nav-link active" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Asset Types</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Asset Type</a>
                        </li>
                        
                    </ul>

                
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show" id="register" role="tabpanel" aria-labelledby="register-tab">
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

                        <div class="tab-pane fade show active" id="manage" role="tabpanel" aria-labelledby="manage-tab">
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
                        <form method='post' onSubmit={updateAssetTypeChanges}>
                            <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Type Alias</label>
                                                <input required='required' type="text" class="form-control" id="assetTypeAliasModal" 
                                                 name="assetTypeAliasModal" placeholder="Asset Type Alias *" 
                                                 value={type_aliasModal}
                                                 onChange={onTypeAliasModalChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Description</label>
                                                <textarea rows='4' type="text" class="form-control" id="assetDescriptionModal" 
                                                 name="assetDescriptionModal" placeholder="Asset Description *" 
                                                 value={type_descriptionModal}
                                                 onChange={onTypeDescriptionModalChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                <div class="col-md-2"></div>
                                <div class="col-md-3"></div>
                                <div class="col-md-7"><br/>
                                    <div className='row'>
                                        <button type='submit' data-id='0' id='btnUpdateAssetType' data- class="btn btn-success btn-icon-split">
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
