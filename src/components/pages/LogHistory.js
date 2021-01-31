import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import api from '../../api/api';
import Swal from 'sweetalert2';

export default function LogHistory() {

    //get the global user state
    const user = useSelector(state => state.user.user);

    //Create a local state here
    const [systemLogs, setSystemLog] = useState([]);//The initial state of systemLog is empty
    const [allUsers, setAllUsers] = useState([]);//The initial state of systemLog is empty

    let columns;

    //On page load
    useEffect(()=>{

        //If the user logged in is an  admin, fetch all the users and all the logs
        if(user.user_type === 'ADMIN'){
            //Make the request to the API and update the state
            //Get the system logs
            api.get('/systemlog')
            .then(response => {
                //update the state
                setSystemLog(response.data.data);
            }).catch(function(error){
                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    text: `${error}`
                });
            });

            //Get all the users
            api.get('/users')
            .then(response => {
                //update the state
                setAllUsers(response.data.data);
            });

            columns= [
                {
                  label: 'Entry Date',
                  field: 'entry_date',
                  sort: 'desc',
                },
                {
                  label: 'Entry Content',
                  field: 'entry_content',
                  sort: 'asc',
                },
                {
                  label: 'Name & Surname',
                  field: 'names',
                  sort: 'asc',
                },
              ]
        }
        //else if it is a technician
        else if(user.user_type === 'TECHNICIAN'){
            //Make the request to the API and update the state
            //Get the system logs
            api.get(`/systemlog/user/${user.user_id}`)
            .then(response => {
                //update the state
                setSystemLog(response.data.data);
            }); //We don't catch coz we are just fetching data

            //Get all the users
            api.get(`/users/${user.user_id}`)
            .then(response => {
                //update the state
                setAllUsers(response.data.data);
            });

            columns= [
                {
                  label: 'Entry Date',
                  field: 'entry_date',
                  sort: 'desc',
                },
                {
                  label: 'Entry Content',
                  field: 'entry_content',
                  sort: 'asc',
                },
            ]
        }
        


    },[user.user_id, user.user_type]);//only rerender if the systemLog change

    let dataRows = JSON.parse(JSON.stringify(systemLogs));
    let userRows = JSON.parse(JSON.stringify(allUsers));
    
    for(var i = 0; i<dataRows.length;i++){

        //loop through all the users
        for(var k = 0; k <userRows.length; k++ ){

            //Change the user id's to the user names
            if(userRows[k]['user_id']===dataRows[i]['user_id'] )
                dataRows[i]['names'] = userRows[k]['user_firstname']+' ' +userRows[k]['user_surname'];
            
            //Make the date more readable
            if(dataRows[i]['entry_date'] )
                dataRows[i]['entry_date'] = dataRows[i]['entry_date'].substring(0,16);

        }
    }

    let data = {

        columns: columns,
        rows: dataRows
      };

    return (
        <div class="container mt-8 mb-8">
            <div class="row">
                <div class="col-md-12" >
                    <h4>Log History</h4><br/>
                    <div class="table-responsive">
                        <MDBDataTable striped bordered data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
