import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'

export default function Customers() {

    let data;
    let adminData;
    //*************Functions**************** */

    //Register Admin Function
    let registerAdmin = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Admin?',
            text: 'Are you sure you want to register the admin?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Register Admin`,
            denyButtonText: `Don't register`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            } else if (result.isDenied) {

              Swal.fire('Admin not registered.', '', 'info')
            }
          });
    }

    //Delete Admin
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
              Swal.fire('Admin deleted!', '', 'success');

            } 
          });
    }

    //Enable API Access
    let enableAPIAccess = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Enable Access?',
            text: 'Are you sure you want to enable API access for this account?',
            showCancelButton: true,
            confirmButtonText: `Enable Access`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            } else if (result.isDismissed) {

              Swal.fire('Access not disabled.', '', 'info')
            }
          });
    }

    //Disable API Access
    let disableAPIAccess = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Disable Access?',
            text: 'Are you sure you want to disable API access for this account?',
            showCancelButton: true,
            confirmButtonText: `Disable Access`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Handle axios request
              Swal.fire('Saved!', '', 'success');

            } else if (result.isDismissed) {

              Swal.fire('Access not disabled.', '', 'info')
            }
          });
    }

    data = {

        columns: [
          {
            label: 'Customer Name',
            field: 'customerName',
            sort: 'asc',
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
          },
          {
            label: 'Telephone',
            field: 'telephone',
            sort: 'asc',
          },
          {
            label: 'API Key',
            field: 'apiKey',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: [
          {
            customerName: 'Tiger Nixon',
            email: 'System Architect',
            telephone: 'Edinburgh',
            apiKey: '61',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },
          {
            customerName: 'Cedric Kelly',
            email: 'Senior Javascript Developer',
            telephone: 'Edinburgh',
            apiKey: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },
          {
            customerName: 'Airi Satou',
            email: 'Accountant',
            telephone: 'Tokyo',
            apiKey: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },

          {
            customerName: 'Charde Marshall',
            email: 'Regional Director',
            telephone: 'San Francisco',
            apiKey: '36',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },
          {
            customerName: 'Haley Kennedy',
            email: 'Senior Marketing Designer',
            telephone: 'London',
            apiKey: '43',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },
          {
            customerName: 'Tatyana Fitzpatrick',
            email: 'Regional Director',
            telephone: 'London',
            apiKey: '19',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#customerDetailsModal">
                        <i class="fas fa-briefcase fa-sm fa-fw mr-2 text-gray-400"></i>
                        Details
                    </button> {' '}
                    <button  type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#customerAdminsModal">
                        <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                        Admins
                    </button> {' '}
                    <button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#registerCustomerAdminModal">
                        <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                        Add
                    </button>
                </div>
            )
          },
        ]
      };

    adminData = {

        columns: [
          {
            label: 'Admin Name',
            field: 'adminName',
            sort: 'asc',
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
          },
          {
            label: 'Cellphone',
            field: 'cellphone',
            sort: 'asc',
          },
          {
            label: 'Role',
            field: 'role',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: [
          {
            adminName: 'Tiger Nixon',
            email: 'System Architect',
            cellphone: 'Edinburgh',
            role: '61',
            action: (
                <div>
                    <button  type="button" onClick={deleteAdmin} class="btn btn-danger btn-sm">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" onClick={enableAPIAccess} class="btn btn-info btn-sm">
                        <i class="fas fa-check fa-sm fa-fw mr-2 text-gray-400"></i>
                        Enable API Access
                    </button>
                </div>
            )
          },
          {
            adminName: 'Cedric Kelly',
            email: 'Senior Javascript Developer',
            cellphone: 'Edinburgh',
            role: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-danger btn-sm ">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" onClick={disableAPIAccess} class="btn btn-warning btn-sm ">
                        <i class="fas fa-times fa-sm fa-fw mr-2 "></i>
                        Disable API Access
                    </button>
                </div>
            )
          },
          {
            adminName: 'Airi Satou',
            email: 'Accountant',
            cellphone: 'Tokyo',
            role: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-danger btn-sm deleteCustomerAdmin">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" class="btn btn-info btn-sm">
                        <i class="fas fa-check fa-sm fa-fw mr-2 text-gray-400"></i>
                        Enable API Access
                    </button>
                </div>
            )
          },

          {
            adminName: 'Charde Marshall',
            email: 'Regional Director',
            cellphone: 'San Francisco',
            role: '36',
            action: (
                <div>
                    <button  type="button" class="btn btn-danger btn-sm deleteCustomerAdmin">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" class="btn btn-warning btn-sm">
                        <i class="fas fa-times fa-sm fa-fw mr-2 "></i>
                        Disable API Access
                    </button>
                </div>
            )
          },
          {
            adminName: 'Haley Kennedy',
            email: 'Senior Marketing Designer',
            cellphone: 'London',
            role: '43',
            action: (
                <div>
                    <button  type="button" class="btn btn-danger btn-sm deleteCustomerAdmin">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" class="btn btn-info btn-sm ">
                        <i class="fas fa-check fa-sm fa-fw mr-2 text-gray-400"></i>
                        Enable API Access
                    </button>
                </div>
            )
          },
          {
            adminName: 'Tatyana Fitzpatrick',
            email: 'Regional Director',
            cellphone: 'London',
            role: '19',
            action: (
                <div>
                    <button  type="button" class="btn btn-danger btn-sm deleteCustomerAdmin">
                        <i class="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                        Delete
                    </button>{' '}
                    <button  type="button" class="btn btn-info btn-sm">
                        <i class="fas fa-check fa-sm fa-fw mr-2 text-gray-400"></i>
                        Enable API Access
                    </button>
                </div>
            )
          },
        ]
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
            <div class="modal fade" id="registerCustomerAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Customer Admin</h5>
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
                                                    <input required='required' type="text" class="form-control" id="username" name="username" placeholder="Username *" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>First Name</label>
                                                    <input required='required' type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name *" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Surname</label>
                                                    <input required='required' type="text" class="form-control" id="surname" name="surname" placeholder="Surname *"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Email</label>
                                                    <input required='required' type="email" class="form-control" id="email" name="email" placeholder="Email *"  />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Cellphone</label>
                                                    <input required='required' type="text" maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class='label'>User Role</label>
                                                    <textarea required='required' type='text' class='form-control' rows='3' id='customerUserRole' name='customerUserRole'  placeholder="User Role *">

                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-2"></div>
                                    <div class="col-md-3"></div>
                                    <div class="col-md-7"><br/>
                                        <div class='row'>
                                            <button type='submit' class="btn btn-success btn-icon-split">
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
