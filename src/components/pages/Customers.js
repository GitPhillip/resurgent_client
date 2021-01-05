import React, { useState} from 'react';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2';
import api from '../../api/api';

export default function Customers({customerState}) {

    let data;
    let adminData;

    //Get the global state
    let customersState = customerState.customers;

    //Get your state
    const [customerAdmins, setCustomerAdmins] = useState([]);//The initial state of admins is empty

    //*********Customer Admin ads****************/
    const [username, setUsername] = useState('');
    const [user_firstname, setFirstName] = useState('');
    const [user_surname, setSurname] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_cellphone, setCellphone] = useState('');
    const [user_role, setUserRole] = useState('');

    //on change handlers 
    const onUsernameChange = e => setUsername(e.target.value);
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSurnameChange = e => setSurname(e.target.value);
    const onEmailChange = e  => setEmail(e.target.value);
    const onCellphoneChange = e => setCellphone(e.target.value);
    const onUserRoleChange = e => setUserRole(e.target.value);

    
    //*************Functions**************** */

    //Register Admin Function
    let registerAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Get the customer id
        var customerId = document.getElementById('btnRegisterAdmin').getAttribute('data-id');

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Admin?',
            text: 'Are you sure you want to register the admin?',
            showCancelButton: true,
            confirmButtonText: `Register Admin`,
          }).then((result) => {
            if (result.isConfirmed) {
             
              //Send the api request to create the customer
              api.post('/users', {
                username,
                user_password: user_email, //passwords
                user_email,
                user_firstname,
                user_surname,
                user_cellphone,
                user_type_id: 3
              }).then(response => {

                //Send another request to add the customer user
                api.post('/customerusers',{
                    user_id: response.data.data.user_id,
                    customer_id: parseInt(customerId),
                    user_role
                }).then(userResponse =>{

                    //Trigger the swal
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: `Customer admin has been added with username: ${response.data.data.username}`
                    });

                    //Set the states back to null
                    setUsername('');
                    setFirstName('');
                    setSurname('');
                    setEmail('');
                    setCellphone('');
                    setUserRole('')

                    //close the modal
                    document.getElementById('registerModal').click();

                }).catch(userError =>{
                    if(userError.response && userError.response.data){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: JSON.stringify(userError.response.data.userError)
                        });
                    }
                });
                
            }).catch(function(error){
                if(error.response && error.response.data){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error.response.data.error[0].name} => ${error.response.data.error[0].errors[0].message}`
                    });
                }
            });
              
            } 
          });
    }

    //Delete Admin
    let deleteAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        //Get the customer user id
        var customerUserId = e.target.getAttribute('data-id');

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Delete Admin?',
            text: 'Are you sure you want to delete the admin account?',
            showCancelButton: true,
            confirmButtonText: `Delete Admin`,
          }).then((result) => {
            if (result.isConfirmed) {
              
                //Send the axios request
                api.delete(`/customerusers/${customerUserId}`)
                .then(function (response) {
                    //update the state
                    setCustomerAdmins(customerAdmins.filter(customerAdmin => customerAdmin.user.user_id !==customerUserId));
                    //display a msg
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        text: `${response.data.message}`,
                    });

                    //close the modal
                   document.getElementById('customerAdminsModal').click();

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

    //View company details Function
    let viewCompanyDetails = (e) =>{
        
        //Get the customer id
        var customerId = e.target.getAttribute('data-id');

        //Send the axios request
        api.get('/customers/'+customerId)
        .then(response => {
            //populate the html elements accordingly
            document.getElementById('customerName').value = response.data.data.customer_name;
            document.getElementById('customerEmail').value = response.data.data.customer_email;
            document.getElementById('customerTelephone').value = response.data.data.customer_telephone;
            document.getElementById('customerNotes').value = response.data.data.customer_notes;

        });
    }

    let addAdmins = (e) =>{
        
        //Get the customer id
        var customerId = e.target.getAttribute('data-id');
        if(customerId!==null){
            //set the register button to the value of the button
            document.getElementById('btnRegisterAdmin').setAttribute('data-id', customerId);
        }
        
        
    }

    //Function to view the company admins
    let viewCompanyAdmins = (e) =>{
        
        //Get the customer id
        e.preventDefault();
        var customerId = e.target.getAttribute('data-id');

        //Send the axios request
        api.get('/customerusers/customer/'+customerId)
        .then(response => {
            //update the state
            setCustomerAdmins(response.data.data);
        });
    }

    let dataRows = JSON.parse(JSON.stringify(customersState));

    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button type="button" class="btn btn-success btn-sm"  data-id={dataRows[i].customer_id}  onClick={viewCompanyDetails} data-toggle="modal" data-target="#customerDetailsModal">
                    <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                    Details 
                </button> {' '}
                <button  type="button" class="btn btn-info btn-sm" data-id={dataRows[i].customer_id}  onClick={viewCompanyAdmins} data-toggle="modal" data-target="#customerAdminsModal">
                    <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                    Admins
                </button> {' '}
                <button  type="button" class="btn btn-primary btn-sm" data-id={dataRows[i].customer_id}  onClick={addAdmins} data-toggle="modal" data-target="#registerModal">
                    <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                    Add
                </button>
            </div>
        )
    }

    data = {

        columns: [
          {
            label: 'Customer Name',
            field: 'customer_name',
            sort: 'asc',
          },
          {
            label: 'Email',
            field: 'customer_email',
            sort: 'asc',
          },
          {
            label: 'Telephone',
            field: 'customer_telephone',
            sort: 'asc',
          },
          {
            label: 'API Key',
            field: 'api_key',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: dataRows
      };

    let customerAdminRows = JSON.parse(JSON.stringify(customerAdmins));

    //For Every object in the JSON object
    for(var j = 0; j<customerAdminRows.length;j++){

        //get the user id of each customer user
        const userId= customerAdminRows[j].user['user_id'];

        //append the action key value pair to the end of each object
        customerAdminRows[j]['action'] = (
            <div>
                <button type="button" data-id={userId} onClick={deleteAdmin} class="btn btn-danger btn-sm">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                </button>
            </div>
        );

        //Add the user details to the outer object
        customerAdminRows[j]['user_names'] = customerAdminRows[j].user['user_firstname'] +" " +customerAdminRows[j].user['user_surname'];
        customerAdminRows[j]['user_email'] = customerAdminRows[j].user['user_email'];
        customerAdminRows[j]['user_cellphone'] = customerAdminRows[j].user['user_cellphone'];

        
    }

    adminData = {

        columns: [
          {
            label: 'Admin Names',
            field: 'user_names',
            sort: 'asc',
          },
          {
            label: 'Email',
            field: 'user_email',
            sort: 'asc',
          },
          {
            label: 'Cellphone',
            field: 'user_cellphone',
            sort: 'asc',
          },
          {
            label: 'Role',
            field: 'user_role',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: customerAdminRows
      };

    return (

        <React.Fragment>
        {/*<!-- Page Heading -->*/}
            <h1 class="h3 mb-2 text-gray-800">Resurgent Customers</h1>

            {/*<!-- DataTales Example -->*/}
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">All Customers</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <MDBDataTable striped bordered data={data} />
                    </div>
                </div>
            </div>

            {/* Customer Details Modal */}
            <div class="modal fade" id="customerDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Customer Details</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="row register-form">
                    
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class='label'>Customer Name</label>
                                            <input type="text" readonly='readonly' class="form-control" required='true' id="customerName" name="customerName" placeholder="Customer Name *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class='label'>Customer Email</label>
                                            <input type="email" readonly='readonly' class="form-control" required='true' id="customerEmail" name="customerEmail" placeholder="Customer Email *" value="" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class='label'>Customer Telephone</label>
                                            <input type="text" readonly='readonly' maxlength="10" minlength="10" class="form-control" required='true' id="customerTelephone" name="customerTelephone" placeholder="Customer Telephone *" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                <div class="row col-md-1"></div>
                                        <div class="row col-md-12">
                                        <label class='label'>Customer Notes</label>
                                        <textarea readonly='readonly' type='text' class='form-control' rows='3' id='customerNotes' name='customerNotes' placeholder="Customer Notes *">

                                        </textarea>
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
            {/* End Customer Details Modal */}

            {/* Customer Admin Modal */}
            <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Customer Details</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method='post' onSubmit={registerAdmin}>
                                <div class="row register-form">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>Username</label>
                                                    <input required='required' type="text" class="form-control" id="username" 
                                                     name="username" placeholder="Username *" 
                                                     value={username}
                                                     onChange={onUsernameChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>First Name</label>
                                                    <input required='required' type="text" class="form-control" id="firstName" 
                                                     name="firstName" placeholder="First Name *" 
                                                     value={user_firstname}
                                                     onChange={onFirstNameChange}/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Surname</label>
                                                    <input required='required' type="text" class="form-control" id="surname" 
                                                     name="surname" placeholder="Surname *"  
                                                     value={user_surname}
                                                     onChange={onSurnameChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Email</label>
                                                    <input required='required' type="email" class="form-control" id="email" 
                                                     name="email" placeholder="Email *"  
                                                     value={user_email}
                                                     onChange={onEmailChange}/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Cellphone</label>
                                                    <input required='required' type="text" maxlength="10" minlength="10" class="form-control" 
                                                     id="cellphone" name="cellphone" placeholder="Cellphone *" 
                                                     value={user_cellphone}
                                                     onChange={onCellphoneChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>User Role</label>
                                                    <textarea required='required' type='text' class='form-control' rows='3' id='customerUserRole' 
                                                     name='customerUserRole'  placeholder="User Role *"
                                                     value={user_role}
                                                     onChange={onUserRoleChange}>

                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-2"></div>
                                    <div class="col-md-3"></div>
                                    <div class="col-md-7"><br/>
                                        <div class='row'>
                                            <button type='submit' data-id='0' id='btnRegisterAdmin' class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Register Admin</span>
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
            {/* End Customer Admin Details Modal */}

            {/* Customer Admin Details*/}
            <div class="modal fade" id="customerAdminsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Customer Admin Details</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <MDBDataTable striped bordered data={adminData} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Customer Admin Details*/}

        </React.Fragment>
    )

}
