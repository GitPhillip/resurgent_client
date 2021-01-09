import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import api from '../../api/api';

import { addCustomer } from '../slices/customerSlice';

export default function Registration() {

    //Handle the states
    let user = useSelector(state => state.user.user);

    //----------Customer registration----------------
    const [customer_name, setCustomerName] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_telephone, setCustomerTelephone] = useState('');
    const [customer_notes, setCustomerNotes] = useState('');

    //on change handlers (Are a must if inputs will be set as states)
    const onCustomerNameChange = e => setCustomerName(e.target.value);
    const onCustomerEmailChange = e => setCustomerEmail(e.target.value);
    const onCustomerTelephoneChange =  e => setCustomerTelephone(e.target.value);
    const onCustomerNotesChange = e => setCustomerNotes(e.target.value);

    //----------Employee registrations------------------
    const [username, setUsername] = useState('');
    const [user_firstname, setFirstName] = useState('');
    const [user_surname, setSurname] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_cellphone, setCellphone] = useState('');
    const [user_type_id, setUserType] = useState(0);

    //on change handlers 
    const onUsernameChange = e => setUsername(e.target.value);
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSurnameChange = e => setSurname(e.target.value);
    const onEmailChange = e  => setEmail(e.target.value);
    const onCellphoneChange = e => setCellphone(e.target.value);
    const onEmployeeTypeChange = e => setUserType(e.target.value);

    //dispatch 
    const dispatch = useDispatch();
 
    //*************Functions*************** */

    //Register Customer Function
    let registerCustomer = (e) =>{

        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Customer?',
            text: 'Are you sure you want to register the customer?',
            showCancelButton: true,
            confirmButtonText: `Register`
          }).then((result) => {
            if (result.isConfirmed) {
              //-----------Handle axios request-----------
              
              //Send the api request to create the customer
              api.post('/customer', {
                customer_name,
                customer_email,
                customer_telephone,
                customer_notes,
              }).then(response => {

                //******NB Order is important */
                //update the state
                dispatch(
                    addCustomer({
                        customer_id: response.data.data.customer_id,
                        customer_name,
                        customer_email,
                        customer_telephone,
                        customer_notes,
                        api_key: response.data.data.api_key,
                        deleted: response.data.data.deleted
                    })
                );

                //***************SYSTEM LOG********************* */
                //********************************************** */
                let entry_content = `Employee Reg: User registered a customer with ${customer_name}.`;
                
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
                    text: `Customer has been added with name: ${response.data.data.customer_name}`
                });

                //Clear all the inputs
                setCustomerName('');
                setCustomerEmail('');
                setCustomerTelephone('');
                setCustomerNotes('');

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

    //Register Employee Function
    let registerEmployee = (e) =>{
        //Prevent form from submitting to the actual file
        e.preventDefault();

        //Trigger the SWAL
        Swal.fire({
            icon: 'question',
            title: 'Register Employee?',
            text: 'Are you sure you want to register the employee?',
            showCancelButton: true,
            confirmButtonText: `Register Employee`
          }).then((result) => {

            if (result.isConfirmed) {
              //-----------Handle axios request-----------
              
              //Send the api request to create the customer
              api.post('/users', {
                username,
                user_password: user_email, //password is defaulted to email
                user_email,
                user_firstname,
                user_surname,
                user_cellphone,
                user_type_id: parseInt(user_type_id)
              }).then(response => {

                //***************SYSTEM LOG********************* */
                //********************************************** */
                let entry_content = ``;
                if(user_type_id===1) entry_content = `Employee Reg: User registered an admin with name(s) ${user_firstname} ${user_surname}.`;
                else entry_content = `Employee Reg: User registered a technician with name(s) ${user_firstname} ${user_surname}.`;
                
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
                    text: `Employee has been added with username: ${response.data.data.username}`
                });
                
                //Set the states back to null
                setUsername('');
                setFirstName('');
                setSurname('');
                setEmail('');
                setCellphone('');
                setUserType('');
            
                }).catch(function(error){
                    if(error.response && error.response.data){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${error.response.data.error[0]}`
                        });
                    }
                });
            } 
          });
    }

    return (
        <div class="row">
            <div class="col-md-12 ">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="customer-tab" data-toggle="tab" href="#customer" role="tab" aria-controls="customer" aria-selected="true">Register Customer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Register Employee</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                        <br/>
                        <h3 class="register-heading">Register Customer</h3>
                        <br/>
                        <form method='post' onSubmit={registerCustomer}>
                            <div class="row register-form">
                    
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Customer Name</label>
                                                <input type="text" class="form-control" required='true'
                                                 id="customerName" name="customerName" placeholder="Customer Name *"
                                                 value={customer_name}
                                                 onChange={onCustomerNameChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Customer Email</label>
                                                <input type="email" class="form-control" required='true'
                                                 id="customerEmail" name="customerEmail" placeholder="Customer Email *"
                                                 value={customer_email}
                                                 onChange={onCustomerEmailChange} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Customer Telephone</label>
                                                <input type="text" maxlength="10" minlength="10" class="form-control" required='true' 
                                                id="customerTelephone" name="customerTelephone" placeholder="Customer Telephone *"
                                                value={customer_telephone}
                                                onChange={onCustomerTelephoneChange}  />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Customer Notes</label>
                                                <textarea type='text' class='form-control' rows='3' id='customerNotes' name='customerNotes'
                                                 value={customer_notes}
                                                 onChange={onCustomerNotesChange}>
                                                </textarea>
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
                                                <span class="text">Register Customer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                        <br/> <br/>
                    </div>

                    <div class="tab-pane fade show" id="admin" role="tabpanel" aria-labelledby="admin-tab">
                        <br/>
                        <h3  class="register-heading">Register Admin</h3>
                        <br/>
                        <form method='post' onSubmit={registerEmployee}>
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
                                                <input required='required' type="text" maxlength="10" minlength="10" 
                                                 class="form-control" id="cellphone" name="cellphone" placeholder="Cellphone *" 
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
                                                <label class='label'>Admin User Type</label>
                                                <select required='required' class="form-control" id='userType' name='userType'
                                                 value={user_type_id}
                                                 onChange={onEmployeeTypeChange}>
                                                    <option hidden selected >Please select the employee type.</option>
                                                    <option value="1" >Administrator</option>
                                                    <option value="2" >Technician</option>
                                                </select>
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
                                                <span class="text">Register Employee</span>
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
    )
}
