import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SignupForm from './forms/signup_form';
import LoginForm from './forms/login_form';

import Test from './test'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm} />
          <Route path="/test" component={Test} />
        </Route>
        <Route path="/signup" component={SignupForm}/>
      </Router>
    </Provider>
  );
};

export default Root;

// import Sidebars from './sidebars/sidebars';
// TODO: add sidebars <Route component={Sidebars}/>
// <Route component={Sidebars}>
//   <Route path="/friends/:id" component={Friend}/>
//
// </Route>
