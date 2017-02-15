import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SignupForm from './signup_form';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}/>
        <Route path='/signup' component={SignupForm}/>
      </Router>
    </Provider>
  );
};

export default Root;
