import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Page404() {

    //Get the user session and set the correct routes
    const user = useSelector(state => state.user.user)
    let route;
    if(user.user_type === "ADMIN") route = '/admin/dashboard';
    else if(user.user_type === "TECHNICIAN") route = '/technician/dashboard';
    else if(user.user_type === "CUSTOMER_USER") route = '/customer/dashboard';
    else route = '/';
    
    return (
         //<!-- Begin Page Content -->
        <React.Fragment>
             {/*<!-- 404 Error Text -->*/}
            <div class="text-center">
                <div class="error mx-auto" data-text="404">404</div>
                <p class="lead text-gray-800 mb-5">Page Not Found</p>
                <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <Link to={route}>&larr; Back to Dashboard</Link>
            </div>
            <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
        </React.Fragment>
            
    )
}
