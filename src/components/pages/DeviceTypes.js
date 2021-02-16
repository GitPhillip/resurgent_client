import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';
import { addDeviceType,deleteDeviceType,updateOneDeviceType } from '../slices/deviceTypeSlice';

export default function DeviceTypes({deviceTypeState}) {

    let data;

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    //Get the global state
    let deviceTypesState = deviceTypeState.deviceTypes;

    //Local states
    const [type_alias, setDeviceTypeAlias] = useState('');
    const [type_description, setDeviceTypeDescription] = useState('');
    const [packet_structure,setPacketStructure] = useState('');
    

    //Onchange handlers
    const onTypeAliasChange = e => setDeviceTypeAlias(e.target.value);
    const onTypeDescriptionChange = e => setDeviceTypeDescription(e.target.value);
    const onPacketStructureChange = e => setPacketStructure(e.target.value);

    //--------------Device Type Updates------------------
    const [type_aliasModal, setDeviceTypeAliasModal] = useState('');
    const [type_descriptionModal, setDeviceTypeDescriptionModal] = useState('');
    
    const [type_packet_structureModal, setTypePacketStructureModal] = useState('');
    const onTypeAliasModalChange = e => setDeviceTypeAliasModal(e.target.value);
    const onTypeDescriptionModalChange = e => setDeviceTypeDescriptionModal(e.target.value);
    const onPacketStructureModalChange = e => setTypePacketStructureModal(e.target.value);

    //******Device Type Conversion Removed for this version */
    //const [type_conversion, setTypeConversion] = useState('');
    //const onTypeConversionChange = e => setTypeConversion(e.target.value);
    //const [type_conversionModal, setTypeConversionModal] = useState('');
    //const onTypeConversionModalChange = e => setTypeConversionModal(e.target.value);

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
            confirmButtonText: `Register`
          }).then((result) => {
            if (result.isConfirmed) {
              
                //Send the api request
                api.post('/devicetypes',{
                    type_alias,
                    type_description,
                    //packet_structure,
                    //data_types: packet_structure,
                    //type_variables: packet_structure
                    //type_conversion,
                }).then( response => {

                    //Dispatch to update the state
                    dispatch(
                        addDeviceType({
                            type_id: response.data.data.type_id,
                            type_alias,
                            type_description,
                            //packet_structure,
                            sigfox_id: response.data.data.sigfox_id,
                            deleted: response.data.data.deleted,
                            //type_conversion,
                            //type_variables: response.data.data.type_variables,
                            //data_types: response.data.data.data_types
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Device Type Reg: User (ID: ${user.user_id}) registered a device type with name ${type_alias} (ID: ${response.data.data.type_id}). `;
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
                        text: `Device type has been added with alias: ${response.data.data.type_alias}`
                    });

                    //Clear all the inputs
                    setDeviceTypeAlias('');
                    //setPacketStructure('');
                    setDeviceTypeDescription('');
                    //setTypeConversion('');

                }).catch(error =>{
                    if(error.response && error.response.data){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: JSON.stringify(error.response.data.error)
                        });
                    }
                });
            } 
          });
    }

    //View Device Type Function
    let viewDeviceType = (e) =>{
    
        //Get the id of the device type
        let deviceTypeId = e.target.getAttribute('data-id');

        //if it is null fire an error msg
        if(deviceTypeId === null)
        {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Something went wrong. Please try again'
            });
        }else{

            //Adjust the update button data-id of the button 
            document.getElementById('btnUpdateDeviceType').setAttribute('data-id', deviceTypeId);

            //Send the axios request to the API
            api.get('/devicetypes/'+deviceTypeId)
            .then(response =>{
                
                //Populate the correct html
                document.getElementById('deviceTypeAliasModal').value =response.data.data.type_alias;
                document.getElementById('deviceTypeDescriptionModal').value = response.data.data.type_description;
                document.getElementById('packetStructureModal').value = response.data.data.packet_structure;
                document.getElementById('sigfoxIDModal').value = response.data.data.sigfox_id;
                //document.getElementById('deviceTypeConversionModal').value = response.data.data.type_conversion;

                //Set the intial values to the ones of the requested device type
                setDeviceTypeAliasModal(response.data.data.type_alias);
                setDeviceTypeDescriptionModal(response.data.data.type_description);
                setTypePacketStructureModal(response.data.data.packet_structure);
                //setTypeConversionModal(response.data.data.type_conversion);

            });

        }
    }

    //Update Device Type Function
    let updateDeviceType = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Get the device type id
        var deviceTypeId = parseInt(document.getElementById('btnUpdateDeviceType').getAttribute('data-id'));

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

              //Send the api request
              api.put(`/devicetypes/${deviceTypeId}`,{
                type_alias: type_aliasModal,
                type_description: type_descriptionModal,
                //packet_structure: type_packet_structureModal,
                //data_types: type_packet_structureModal
                //type_conversion: type_conversionModal,
                }).then(function (response){

                    //dispatch to update the state
                    dispatch(
                        updateOneDeviceType({
                            type_id: deviceTypeId,
                            type_alias: type_aliasModal,
                            type_description: type_descriptionModal,
                            //packet_structure: type_packet_structureModal
                            //type_conversion: type_conversionModal,
                            
                        })
                    )

                    //***************SYSTEM LOG********************* */
                    //********************************************** */
                    let entry_content = `Device Type Reg: User (ID: ${user.user_id}) edited a device type with name ${type_aliasModal} (ID: ${deviceTypeId})`;
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
                        text: `${response.data.message}`
                    });

                    //clear all the input fields
                    setDeviceTypeAliasModal('');
                    setDeviceTypeDescription('');
                    //setTypePacketStructureModal('');
                    //setTypeConversionModal('');

                    //Close the modal
                    document.getElementById('deviceTypeModal').click();

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

      //Delete Device Type Function
      let deleteOneDeviceType = (e) =>{

        //Get the device type id
         let deviceTypeId = parseInt(e.target.getAttribute('data-id'));

         //Check if the ID is a valid number
        if(isNaN(deviceTypeId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try delete again.`
            });
        }else{

            //Trigger the SWAL
            Swal.fire({
                icon: 'question',
                title: 'Delete Device Type?',
                text: 'Are you sure you want to delete the device type?',
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                if (result.isConfirmed) {
                //Handle axios request

                //Send the api request
                api.delete(`/devicetypes/${deviceTypeId}`)
                .then(function (response){

                        //dispatch to update the state
                        dispatch(
                            deleteDeviceType({
                                type_id: deviceTypeId,
                            })
                        )

                        //***************SYSTEM LOG********************* */
                        //********************************************** */
                        let entry_content = `Device Type Delete: User (ID: ${user.user_id}) deleted a device type with name ${response.data.type_alias} (ID: ${deviceTypeId})`;
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

    }

    let dataRows = JSON.parse(JSON.stringify(deviceTypesState));

    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <MDBBtn size="sm" color='success' data-id={dataRows[i].type_id} onClick={viewDeviceType} data-toggle="modal" data-target="#deviceTypeModal">
                <i class="fas fa-cog fa-sm fa-fw mr-2 "></i>Details 
                </MDBBtn>
                 {' '}
                <MDBBtn size="sm" color='danger' data-id={dataRows[i].type_id} onClick={deleteOneDeviceType}>
                <i class="fa fa-trash fa-sm fa-fw mr-2 "></i>Delete
                </MDBBtn>
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
                            <a class="nav-link active" id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">Manage Device Types</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register Device Type</a>
                        </li>
                        
                    </ul>

                    <div class="tab-content" id="myTabContent">

                        <div class="tab-pane fade show active" id="manage" role="tabpanel" aria-labelledby="manage-tab">
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

                        <div class="tab-pane fade show" id="register" role="tabpanel" aria-labelledby="register-tab">
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
                                                    <input required='required' class='form-control' id='deviceTypeAlias' 
                                                     name='deviceTypeAlias' placeholder="Device Type Alias*"
                                                     value={type_alias}
                                                     onChange={onTypeAliasChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                {/*<div class="col-md-6">
                                                    <label class='label'>Device Type Converstion</label>
                                                    <input required='required' class='form-control' id='deviceTypeConversion' 
                                                     name='deviceTypeConversion' placeholder="Device Type Conversion*"
                                                     value={type_conversion}
                                                     onChange={onTypeConversionChange}/>
                                                </div>*/}
                                                <div class="col-md-12" title='This is defaulted to the solar tracking device packet structure for version 1.0'>
                                                    <label class='label'>Packet Structure</label>
                                                    <button data-toggle="modal" data-target="#packetModal" type='button' class='btn'><i class="fas fa-question text-info" title='Custom message type decoding grammar.'></i></button>
                                                    <input readOnly='true' class='form-control' id='deviceTypePacketStructure' 
                                                     name='deviceTypePacketStructure' placeholder="Device Type Packet Structure*"
                                                     value={packet_structure}
                                                     onChange={onPacketStructureChange}/>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row col-md-12">
                                                <label class='label'>Device Type description</label>
                                                <textarea type='text' class='form-control' rows='4' id='deviceTypeDescription' 
                                                 name='deviceTypeDescription'
                                                 value={type_description}
                                                 onChange={onTypeDescriptionChange}>

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
                                                    <span class="text">Register Device Type</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                            <br/> <br/>
                        </div>

                    </div>
                </div>
            </div>

            {/* Device Type Details Modal */}
            <div class="modal fade active" id="deviceTypeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                                                <input required='required' class='form-control' id='deviceTypeAliasModal' 
                                                 name='deviceTypeAliasModal' placeholder="Device Type Alias*"
                                                 value={type_aliasModal}
                                                 onChange={onTypeAliasModalChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            {/*<div class="col-md-6">
                                            <label class='label'>Device Type Conversion</label>
                                                <input required='required' type='text' class='form-control' id='deviceTypeConversionModal' 
                                                 name='deviceTypeConversionModal' placeholder="Device Type Conversion *" 
                                                 value={type_conversionModal}
                                                 onChange={onTypeConversionModalChange}/>
                                            </div>*/}
                                            <div class="col-md-12" title="This is defaulted to the solar tracking device packet structure for version 1.0">
                                                <label class='label'>Packet Structure</label>
                                                <button data-toggle="modal" data-target="#packetModal" type='button' class='btn'><i class="fas fa-question text-info" title='Custom message type decoding grammar.'></i></button>
                                                <input readOnly='true' type="text" class="form-control" id="packetStructureModal"
                                                 name="packetStructureModal" placeholder="Packet Structure *"
                                                 value={type_packet_structureModal}
                                                 onChange={onPacketStructureModalChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Sigfox ID</label>
                                                <input required='required' readonly='readonly' type='text' class='form-control' id='sigfoxIDModal'
                                                 name='sigfoxIDModal' placeholder="Sigfox ID *"
                                                  />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device Type Description</label>
                                                <textarea rows='4' type="text" class="form-control" id="deviceTypeDescriptionModal"
                                                 name="deviceTypeDescriptionModal" placeholder="Device Type Description *" 
                                                 value={type_descriptionModal}
                                                 onChange={onTypeDescriptionModalChange} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                <div class="col-md-2"></div>
                                <div class="col-md-3"></div>
                                <div class="col-md-7"><br/>
                                    <div className='row'>
                                        <button type='submit' data-id='0' id='btnUpdateDeviceType' class="btn btn-success btn-icon-split">
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

        {/*<!-- Device Packet Guide-->*/}
        <div class="modal fade" id="packetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Custom message type decoding grammar?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body bg-gray-300">

                                <div class='col-md-12'>
                                    <h6>The "custom format" grammar is as follows :</h6>
                                    <div class='col-md-2'></div>
                                    <div class='col-md-8 bg-white'>

                                        format = field_def [" " field_def]* ;<br/>
                                        field_def = field_name ":" byte_index ":" type_def ;<br/>
                                        field_name = (alpha | digit | "#" | "_")* ;<br/>
                                        byte_index = [digit*] ;<br/>type_def = bool_def | char_def | float_def |  uint_def ;<br/>
                                        bool_def = "bool:" ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7") ;<br/>
                                        char_def = "char:" length ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7");<br/>
                                        float_def = "float:" ("32" | "64") [ ":little-endian" | ":big-endian" ] ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7");<br/>
                                        uint_def = "uint:" ["1" - "64"] [ ":little-endian" | ":big-endian" ] ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7");<br/>
                                        int_def = "int:" ["1" - "64"] [ ":little-endian" | ":big-endian" ] ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7");<br/>
                                        length = number* ;<br/>digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                                    </div>
                                    <div class='col-md-2'></div>
                                </div>
                                <div class='col-md-12'><br/><br/>
                                A field is defined by its name, its position in the message bytes, its length and its type :<br/>
                                the field name is an identifier including letters, digits and the '-' and '_' characters.
                                the byte index is the offset in the message buffer where the field is to be read from, starting at zero. If omitted, the position used is the current byte for boolean fields, the next byte for all other types if the previous element has no bit offset and the last byte used if the previous element has a bit offset. For the first field, an omitted position means zero (start of the message buffer)
                                Next comes the type name and parameters, which varies depending on the type :<br/>
                                <i class="fas fa-square"></i><strong> boolean</strong>: parameter is the bit position in the target byte <br/>
                                <i class="fas fa-square"></i><strong> char</strong> : parameter is the number of bytes to gather in a string, and optionally the bit offset where to start the reading of the first byte, Default value is 7 for the offset <br/>
                                <i class="fas fa-square"></i><strong> float</strong> : parameters are the length in bits of the value, which can be either 32 or 64 bits, optionally the endianness for multi-bytes floats, and optionally the bit offset where to start the reading of the first byte. Default is big endian and 7 for the offset. Decoding is done according to the IEEE 754 standard.<br/>
                                <i class="fas fa-square"></i><strong> uint</strong> (unsigned integer) : parameters are the number of bits to include in the value, optionally the endianness for multi-bytes integers, and optionally the bit offset where to start the reading of the first byte. Default is big endian and 7 for the offset.<br/>
                                <i class="fas fa-square"></i><strong> int</strong> (signed integer) : parameters are the number of bits to include in the value, optionally the endianness for multi-bytes integers, and optionally the bit offset where to start the reading of the first byte. Default is big endian and 7 for the offset.<br/>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            </div>
                    </div>
                </div>
            </div>
            {/*<!-- Device Packet Guide-->*/}

    </React.Fragment>
    )
}
