import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { MDBDataTable } from 'mdbreact';
//import Swal from 'sweetalert2'

//import the slices with the reducers
import { selectAdmins, /*selectIsLoading,*/ fetchAdmins} from '../slices/adminSlice'

export default function UserManagement() {

    const admins = useSelector(selectAdmins); 
    //const isLoading = useSelector(selectIsLoading); 

    const dispatch = useDispatch();

    //React will perform tasks here after DOM  updates
    useEffect(() =>{
        
        dispatch(fetchAdmins());
       
    }, [dispatch]);
    
    let data;  

    let dataRows = JSON.parse(JSON.stringify(admins.admins));

    
    for(var i = 0; i<dataRows.length;i++){

        for(var j = 0; j < Object.keys(dataRows[i]).length;j++){
            dataRows[i]['action'] = (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
        }
    }
    
    
    //**************Functions************ */
    /*Delete Admin
    let deleteAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Delete Admin?',
            text: 'Are you sure you want to delete the admin account?',
            showCancelButton: true,
            confirmButtonText: `Delete Admin`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            }
          });
    }
    */
    data = {

        columns: [
          {
            label: 'User ID',
            field: 'user_id',
            sort: 'asc',
          },
          {
            label: 'Username',
            field: 'username',
            sort: 'asc',
          },
          {
            label: 'First Name',
            field: 'user_firstname',
            sort: 'asc',
          },
          {
            label: 'Surname',
            field: 'user_surname',
            sort: 'asc',
          },
          {
            label: 'Cellphone',
            field: 'user_cellphone',
            sort: 'asc',
          },
          {
            label: 'User Type',
            field: 'user_type_id',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action',

          },
          
        ], 
        rows: dataRows
      };
      

      //columns

    return (

        <React.Fragment>
            {/*<!-- Page Heading -->*/}
            <h1 class="h3 mb-2 text-gray-800">All Users </h1>
            
            <br/>
            {/*<!-- DataTales Example -->*/}
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">All Resurgent Employees</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <MDBDataTable striped bordered data={data} />
                    </div>
                </div>
            </div>

            {/* ----------- Admin Modal---------- */}

            <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Admin Details</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="row">

                            <div class="col-md-12 ">

                                <h3 id="userName" name="userName" class="register-heading" >Douglas' profile:</h3>
                                <br/>
                                <div class="row register-form">

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>First Name</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="firstName" name="firstName" placeholder="First Name *"  />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Surname</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="surname" name="surname" placeholder="Surname *" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Email</label>
                                                    <input type="email" readonly='readonly' class="form-control" id="email" name="email" placeholder="Email *" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Cellphone</label>
                                                    <input type="text" readonly='readonly' maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row col-md-12">
                                                <label class='label'>User Type Description</label>
                                                <textarea type='text' readonly='readonly' class='form-control' rows='4' id='userTypeDescription' name='userTypeDescription'>

                                                </textarea>
                                            </div>
                                            
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

            {/* ----------- End Admin Modal---------- */}

        </React.Fragment>
    )
}
