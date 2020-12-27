import React from 'react'
import { MDBDataTable } from 'mdbreact';

export default function UserManagement() {

    const data = {

        columns: [
          {
            label: 'Name',
            field: 'name',
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
            label: 'User Type',
            field: 'userType',
            sort: 'asc',
          },
          {
            label: 'Action',
            field: 'action'
          },
          
        ],
        rows: [
          {
            name: 'Tiger Nixon',
            email: 'System Architect',
            cellphone: 'Edinburgh',
            userType: '61',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            name: 'Cedric Kelly',
            email: 'Senior Javascript Developer',
            cellphone: 'Edinburgh',
            userType: '22',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            name: 'Airi Satou',
            email: 'Accountant',
            cellphone: 'Tokyo',
            userType: '33',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },

          {
            name: 'Charde Marshall',
            email: 'Regional Director',
            cellphone: 'San Francisco',
            userType: '36',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            name: 'Haley Kennedy',
            email: 'Senior Marketing Designer',
            cellphone: 'London',
            userType: '43',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
          {
            name: 'Tatyana Fitzpatrick',
            email: 'Regional Director',
            cellphone: 'London',
            userType: '19',
            action: (
                <div>
                    <button  type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailsModal">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        View Details
                    </button>
                </div>
            )
          },
        ]
      };

    return (

        <React.Fragment>
            {/*<!-- Page Heading -->*/}
            <h1 class="h3 mb-2 text-gray-800">All Users</h1>
            <br/>
            {/*<!-- DataTales Example -->*/}
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">All Resurgent Users</h6>
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
                                                    <input type="text" readonly='readonly' class="form-control" id="firstName" name="firstName" placeholder="First Name *" value="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Surname</label>
                                                    <input type="text" readonly='readonly' class="form-control" id="surname" name="surname" placeholder="Surname *" value="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class='label'>Email</label>
                                                    <input type="email" readonly='readonly' class="form-control" id="email" name="email" placeholder="Email *" value="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class='label'>Cellphone</label>
                                                    <input type="text" readonly='readonly' maxlength="10" minlength="10" class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" value="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                        <div class="row col-md-1"></div>
                                            <div class="row col-md-11">
                                                <label class='label'>User Type description</label>
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
