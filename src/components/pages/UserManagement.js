import React, {useEffect,useState} from 'react'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'

import {useSelector} from 'react-redux';

import api from '../../api/api';

export default function UserManagement() {

    //Get your global state
    const user = useSelector(state => state.user.user);

    //Get your local state
    const [admins, setAdmins] = useState([]);//The initial state of admins is empty
    const [technicians, setTechnicians] = useState([]);//The initial state of technicians is empty

    //On page load
    useEffect(()=>{

        //Make the request to the API and update the state
        api.get('/users/usertype/1')
        .then(response => {
            //update the state
            setAdmins(response.data.data);
        }).catch(function(error){
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });

        //Make the request to the API and update the state
        api.get('/users/usertype/2')
        .then(response => {
            //update the state
            setTechnicians(response.data.data);
        }).catch(function(error){
            if(error.response && error.response.data){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error.response.data.error}`
                });
            }
        });

    }, [user]);//only rerender if the admins change

    let data;  

    //*************Functions ********************/

    let viewEmployeeDetails = (e) =>{
        
        //Get the customer id
        var employeeId = praseInt(e.target.getAttribute('data-id'));
        let userTypeDescription ='';

        if(isNaN(employeeId)){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Please try again.`
            });
        }else{

            //get the specific user type
            //Send the axios request
            api.get('/usertypes/1')
            .then(response =>{
                userTypeDescription = response.data.data.user_type_description;
            });

            //Send the axios request
            api.get('/users/'+employeeId)
            .then(response => {
                //populate the html elements accordingly
                document.getElementById('usernameHeading').innerText = response.data.data.username;
                document.getElementById('firstName').value = response.data.data.user_firstname;
                document.getElementById('surname').value = response.data.data.user_surname;
                document.getElementById('email').value = response.data.data.user_email;
                document.getElementById('cellphone').value = response.data.data.user_cellphone;
                document.getElementById('userTypeDescription').value = userTypeDescription;

            });


        }

    }

    //Delete Admin
    let deleteAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();
        var employeeId = parseInt(e.target.getAttribute('data-id'));

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Delete Admin?',
            text: 'Are you sure you want to delete the admin account?',
            showCancelButton: true,
            confirmButtonText: `Delete Admin`,
          }).then((result) => {
            if (result.isConfirmed) {
             
                //Send the request to the api
                api.delete(`/users/${employeeId}`)
                .then(function (response) {

                    //update the state accordingly
                    let entry_content = ``;
                    if(response.data.type===1){
                        setAdmins(admins.filter(admin => admin.user_id !==employeeId));
                        entry_content = `Employee Delete: User (ID: ${user.user_id}) deleted an admin with name(s) ${response.data.names} (ID: ${employeeId}).`;
                    }else if(response.data.type===2)
                    {
                        setTechnicians(technicians.filter(technician => technician.user_id !==employeeId));
                        entry_content = `Employee Delete: User (ID: ${user.user_id}) deleted a technician with name(s) ${response.data.names} (ID: ${employeeId}).`;
                    }
                    
                    //***************SYSTEM LOG********************* */
                    //********************************************** */
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

                    //display a msg
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
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

    let dataRows = JSON.parse(JSON.stringify(admins));
    let technicianRows = JSON.parse(JSON.stringify(technicians));
    
    //Add the two objects together
    dataRows = dataRows.concat(technicianRows);

    for(var i = 0; i<dataRows.length;i++){

        if(dataRows[i]['user_type_id']===1) dataRows[i]['user_type_id'] = 'Administrator';
        else if(dataRows[i]['user_type_id']===2) dataRows[i]['user_type_id'] = 'Technician';

        for(var j = 0; j < Object.keys(dataRows[i]).length;j++){
            dataRows[i]['action'] = (
                <div>
                    <button  type="button" data-id={dataRows[i]['user_id']} class="btn btn-success btn-sm" onClick={viewEmployeeDetails} data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button> {' '}
                    <button  type="button" data-id={dataRows[i]['user_id']} class="btn btn-danger btn-sm" onClick={deleteAdmin}>
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete user
                    </button>
                </div>
            )
        }
    }
    

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
            label: 'Employee Type',
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

                                <div class='row'>
                                    <h3 id="usernameHeading" name="usernameHeading" class="register-heading">Loading...</h3> <h3>'s profile:</h3>
                                </div>
                                
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
