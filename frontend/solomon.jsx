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

import {getFriends, getFriend, deleteFriend, addFriend} from './actions/friend_actions';
window.getFriends = getFriends;
window.getFriend = getFriend;
window.deleteFriend = deleteFriend;
window.addFriend = addFriend;
