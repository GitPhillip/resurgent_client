import React,{useState, useEffect} from 'react'
import { MDBDataTable } from 'mdbreact';
import api from '../../api/api'

export default function PersonalLogHistory() {

    //Create a local state here
    const [systemLogs, setSystemLog] = useState([]);//The initial state of systemLog is empty
    const [allUsers, setAllUsers] = useState([]);//The initial state of systemLog is empty

    //On page load
    useEffect(()=>{

        //Make the request to the API and update the state
        //Get the system logs
        api.get('/systemlog')
        .then(response => {
            //update the state
            setSystemLog(response.data.data);
        });

        //Get all the users
        api.get('/users')
        .then(response => {
            //update the state
            setAllUsers(response.data.data);
        });


    },[]);//only rerender if the systemLog change

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
          }          
          
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
