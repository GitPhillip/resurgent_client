//Imports
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components

import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Admin from './components/pages/Admin';
import Technician from './components/pages/Technician';
import Customer from './components/pages/Customer';
import Page404 from './components/pages/Page404';

export default function App() {

    return (

      <Router>

          {/* Can only put Routes in switch component */}
          <Switch> 

              {/* Login */}
                  <Route exact path='/' component = {Login} />
              {/* End Login */}

              {/* ForgotPassword */}
              <Route path='/forgot_password' component = {ForgotPassword} />
              {/* End ForgotPassword */}
              
              {/* Admin screens */}
              <Route path='/admin' component = {Admin} />
              {/* End Admin screens */}

              {/* Technician screens */}
              <Route path='/technician' component = {Technician} />
              {/* End Admin screens */}

              {/* Customer screens */}
              <Route path='/customer' component = {Customer} />
              {/* End Customer screens */}

              {/* Catch Wrong Route */}
              <Route component = {Page404} />
              {/* End Catch Wrong Route */}
              
          </Switch>
          
      </Router>
        
    )
}
