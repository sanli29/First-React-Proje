import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sales from './components/pages/sales';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import FileState from './context/file/FileState';
import SaleState from './context/sale/SaleState';

import PrivateRoute from './components/routing/PrivateRoute';
import StyledDropzone from './components/pages/StyledDropzone';


function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <FileState>
          <SaleState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/login' component={Login} />

                    <PrivateRoute exact path='/sales' component={Sales} />
                    <PrivateRoute exact path='/StyledDropzone' component={StyledDropzone} />


                    <Route exact component={NotFound} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </SaleState>
        </FileState>
      </AlertState>
    </AuthState>
  );
}

export default App;