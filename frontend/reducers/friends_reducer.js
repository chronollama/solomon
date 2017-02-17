import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from '../actions/friend_actions';

const friendsReducer = (state = {}, action) => {
  Object.freeze(state);
  let copy = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      return Object.assign({}, state, action.friends);
    case RECEIVE_FRIEND:
      return Object.assign({}, copy, {[action.friend.id]: action.friend});
    case REMOVE_FRIEND:
      delete copy.friends[action.friend.id];
      return copy;
    default:
      return state;
  }
};

export default friendsReducer;
