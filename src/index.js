import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './app/store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistStore } from 'redux-persist'

//Loaders
import LoadingOverlay from 'react-loading-overlay';
//import BounceLoader from 'react-spinners/BounceLoader';
import styled from 'styled-components'


const StyledLoader = styled(LoadingOverlay)`
  width:100%;
  height: 700px;
  text-align: center;
  overflow: scroll;
  .MyLoader_overlay {
    background: {
                linear-gradient(rgba(255, 0, 0, 0.5)),
                url('../public/images/')
              }
  }
  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`;

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate timeout={1000} loading={ <StyledLoader
                                  active={true}
                                  spinner
                                  classNamePrefix='MyLoader_'
                                  text='Loading your content...'
                                >
                                </StyledLoader> } 
                      persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
