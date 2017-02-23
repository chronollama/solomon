import { RECEIVE_FRIENDS,
  RECEIVE_FRIEND,
  REMOVE_FRIEND
} from '../actions/friend_actions';

const friendsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      return action.friends;
    case RECEIVE_FRIEND:
      return Object.assign({}, state, {[action.friend.id]: action.friend});
    case REMOVE_FRIEND:
      let copy = Object.assign({}, state);
      delete copy[action.friend.id];
      return copy;
    default:
      return state;
  }
};

export default friendsReducer;
