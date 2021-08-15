/* global localStorage*/
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.getItem('jwtToken')) {
  setAuthorizationToken(localStorage.getItem('jwtToken'));
  // prevent some tampering manually token
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('jwtToken'))));
  }
  catch (err) {
    store.dispatch(setCurrentUser({}))
  }
}

const App = () => (
  <Provider store = {store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
    </Provider>
)

export default App;
