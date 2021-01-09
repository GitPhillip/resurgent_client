import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
    return (
         //<!-- Begin Page Content -->
        <React.Fragment>
             {/*<!-- 404 Error Text -->*/}
            <div class="text-center">
                <div class="error mx-auto" data-text="404">404</div>
                <p class="lead text-gray-800 mb-5">Page Not Found</p>
                <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <Link to="/">&larr; Back to Dashboard</Link>
            </div>
            <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
        </React.Fragment>
            
    )
}
