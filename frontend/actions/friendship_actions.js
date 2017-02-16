import * as APIUtil from '../util/friend_api_util';

export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export const receiveFriend = (friend) => {
  return {
    type: RECEIVE_FRIEND,
    friend
  }
};

export const removeFriend = (friend) => {
  return {
    type: RECEIVE_FRIEND,
    friend
  }
};

export const addFriend = (friend) => {
  return (dispatch) => {
    return APIUtil.addFriend(friend).then(
      (friend) => dispatch(receiveFriend(friend))
    );
  };
};

export const removeFriend = (id) => {
  return (dispatch) => {
    return APIUtil.removeFriend(id).then(
      (friend) => dispatch(removeFriend(friend))
    );
  };
};

// TODO: error handling for friends?
