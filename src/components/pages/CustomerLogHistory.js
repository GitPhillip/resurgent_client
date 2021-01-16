import React,{useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import api from '../../api/api';
import Swal from 'sweetalert2';

export default function CustotmerLogHistory() {

    //get the global user state
    const user = useSelector(state => state.user.user);

    //Create a local state here 
    const [systemLogs, setSystemLog] = useState({
        logs: [],
        users: []
    });//The initial state of systemLog is empty
    //const [allUsers, setAllUsers] = useState([]);//The initial state of systemLog is empty

    //Array to keep all the users and the system logs
    let logArray = useMemo( () => [], []);
    let usersArray = useMemo(() => [], [])
    /*
    */

    //On page load 
    useEffect(()=> { 

        //get the company users that belong to this company
        api.get(`/customerusers/customer/${user.user_company_id}`)
        .then( response =>{

            //for all the customer users, get their system logs
            for(var  i = 0; i < response.data.data.length; i++){
                //Add this particular user to the array
                var customerUser = response.data.data[i].user;
                usersArray.push(customerUser);

                api.get(`systemlog/user/${customerUser.user_id}`)
                .then(logResponse => {

                    for(var k = 0; k < logResponse.data.data.length; k++){
                        //Add the logs to the array
                        var log = logResponse.data.data[k];
                        logArray.push(log);
                    }
                    //Now set the states
                    //Set the states
                    setSystemLog({
                        logs: logArray,
                        users: usersArray
                    });
                    
                })
                .catch(logError =>{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: `${logError}`
                    });
                });
               
            }
            //End outer for loop

        })
        .catch(error =>{
            Swal.fire({
                icon: 'warning',
                title: 'Error Bro',
                text: `${error}`
            });
        });
        
        
    },[user.user_company_id, user.user_id, logArray, usersArray]);//only rerender if the systemLog change

    let dataRows = JSON.parse(JSON.stringify(systemLogs.logs));
    let userRows = JSON.parse(JSON.stringify(systemLogs.users));

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

        columns: [
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
          
          
        ],
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
