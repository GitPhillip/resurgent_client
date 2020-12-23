//Imports
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components

import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Admin from './components/pages/Admin';
import Page404 from './components/pages/Page404';

class App extends Component{

  //Here is your state
  state = {
    
  }

  render() {
    return (
      <Router>
        <div className="App">

          <Switch>
              {/* Login */}
              <div className='container'>
                  <Route exact path='/' component = {Login} />
              </div>
              {/* End Login */}

              {/* ForgotPassword */}
              <Route exact path='/forgot_password' component = {ForgotPassword} />
              {/* End ForgotPassword */}
              
              {/* Admin screens */}
              <Route path='/admin' component = {Admin} />
              {/* End Admin screens */}

              {/* Catch Wrong Route */}
              <Route component = {Page404} />
              {/* End Catch Wrong Route */}

          </Switch>
          
          

      </div>
      </Router>
      
    );
  }
}
  

export default App;

