import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser, errors: []}};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  // TODO remove window.store
  window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});

// TODO remove these when done testing
// import {getBills, getBill, deleteBill, addBill} from './actions/bill_actions';
// window.getBills = getBills;
// window.getBill = getBill;
// window.deleteBill = deleteBill;
// window.addBill = addBill;
