import React, {useEffect} from 'react'
import { Redirect} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

//global fetches
import {useSelector} from 'react-redux';

//api import
import api from '../../api/api';

export default function CustomerAssets({customerState,assetState,deviceState, assetTypeState}) {

    let data;
    //***********Functions************ */

    let IsLoadingAssestTypes = assetTypeState.isLoading;

    //On page load
    useEffect(() => {
       
        
    }, [])

    //Function to view customer assets
    let viewAssetDetails = (e) =>{
        
        //Get the asset id
        var assetId = parseInt(e.target.getAttribute('data-id'));

        //find all the devices that contain this asset it and put them in an array
        let dataRows = JSON.parse(JSON.stringify(deviceState.devices));

        let deviceHtml = ``;
        for(var k =  0; k < dataRows.length;k++){
            
            if(dataRows[k]['asset_id'] === assetId)
                deviceHtml += `<p><i class='fa fa-cog'></i> Packet Structure: ${dataRows[k]['device_pac']}.  Sigfox Id: ${dataRows[k]['sigfox_id']} </p>`;
        }
        
        //Send the axios request
        api.get('/assets/'+assetId)
        .then(response => {
            //populate the html elements accordingly
            document.getElementById('assetNameModal').value = response.data.data.asset_name;
            document.getElementById('assetTypeIdModal').value = response.data.data.asset_type_id;
            document.getElementById('deviceIdModal').innerHTML = deviceHtml;
            document.getElementById('assetDescriptionModal').value = response.data.data.asset_description;

        });
    }

    const user = useSelector(state => state.user.user);
    //if the company id is not there
    if(user.user_company_id ===undefined){
        return <Redirect to='/' />
    }

    //loop through the assets and return those thaat belong to the session company
    const customerAssets = assetState.assets.filter(asset => asset.customer_id === user.user_company_id);

    //Make deep copies of the states
    let dataRows = JSON.parse(JSON.stringify(customerAssets));
    let customerRows = JSON.parse(JSON.stringify(customerState.customers));
    let assetTypeRows = JSON.parse(JSON.stringify(assetTypeState.assetTypes));

    //Add the action column
    //For Every object in the JSON object
    for(var i = 0; i<dataRows.length;i++){

        //Replace the customer id with the customer name

        //loop through all the customers
        for(var k = 0; k <customerRows.length; k++ ){

            if(customerRows[k]['customer_id']===dataRows[i]['customer_id'] )
                dataRows[i]['customer_id'] = customerRows[k]['customer_name'];
            
        }

        //loop through all the asset types
        for(var j = 0; j <assetTypeRows.length; j++ ){

            if(assetTypeRows[j]['type_id']===dataRows[i]['asset_type_id'] )
                dataRows[i]['asset_type_id'] = assetTypeRows[j]['type_alias'];
            
        }

        //append the action key value pair to the end of each object
        dataRows[i]['action'] = (
            <div>
                <button type="button" class="btn btn-success btn-sm" onClick={viewAssetDetails} data-id={dataRows[i]['asset_id']} data-toggle="modal" data-target="#assetDetailsModal">
                    <i class="fas fa-truck fa-sm fa-fw mr-2 text-gray-400"></i>
                    View Details
                </button>
            </div>
        )
    }


    data = {

        columns: [
          {
            label: 'Asset ID',
            field: 'asset_id',
            sort: 'asc',
          },
          {
            label: 'Asset Name',
            field: 'asset_name',
            sort: 'asc',
          },
          {
            label: 'Customer Name',
            field: 'customer_id',
            sort: 'asc',
          },
          {
            label: 'Asset Type',
            field: 'asset_type_id',
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
                    

                    <h3  class="register-heading">Manage Assets</h3>
                    <br/>
                    
                    {/*<!-- DataTales Example -->*/}
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">All Assets</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <MDBDataTable striped bordered data={data} />
                            </div>
                        </div>
                    </div>
                            
                    
                </div>
            </div>

            {/* Asset Details Modal */}
            <div class="modal fade" id="assetDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Asset Details</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <div class="row register-form">
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class='label'>Asset Name</label>
                                                <input readOnly='readonly' type="text" class="form-control" id="assetNameModal" 
                                                 name="assetNameModal" placeholder="Asset Name *"  />
                                            </div>
                                            <div class="col-md-6">
                                                <label class='label'>Asset Type</label>
                                                {!IsLoadingAssestTypes ? (
                                                        
                                                        <select readOnly='readonly' class='form-control' id='assetTypeIdModal'
                                                         name='assetTypeIdModal'>
                                                            <option hidden selected disabled>Please choose a asset type.</option>
                                                            {assetTypeState.assetTypes.map(assetType => <option value={assetType.type_id} >{assetType.type_alias}</option>)}
                                                        </select>
                                                        
                                                        ) : (<option>Loading...</option> )
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Device(s) Attached</label>
                                                <div readOnly='readonly' id='deviceIdModal'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class='label'>Asset Description</label>
                                                <textarea readOnly='readonly' rows='4' type="text" class="form-control" id="assetDescriptionModal" 
                                                 name="assetDescriptionModal" placeholder="Asset Description *"
                                                 ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/>
                                
                                
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
            </div>
        </div>
        {/* End Asset Details Modal */}

    </React.Fragment>
    )
}
