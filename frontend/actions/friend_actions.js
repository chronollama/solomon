import * as APIUtil from '../util/friend_api_util';

export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export const receiveFriends = (friends) => {
  return {
    type: RECEIVE_FRIENDS,
    friends
  };
};

export const receiveFriend = (friend) => {
  return {
    type: RECEIVE_FRIEND,
    friend
  };
};

export const removeFriend = (friend) => {
  return {
    type: REMOVE_FRIEND,
    friend
  };
};

export const getFriends = () => {
  return (dispatch) => {
    return APIUtil.getFriends().then(
      (friends) => dispatch(receiveFriends(friends))
    );
  };
};

export const getFriend = (id) => {
  return (dispatch) => {
    return APIUtil.getFriend(id).then(
      (friend) => dispatch(receiveFriend(friend))
    );
  };
};

export const addFriend = (friend) => {
  return (dispatch) => {
    return APIUtil.addFriend(friend).then(
      (friend) => dispatch(receiveFriend(friend))
    );
  };
};

export const deleteFriend = (id) => {
  return (dispatch) => {
    return APIUtil.deleteFriend(id).then(
      (friend) => dispatch(removeFriend(friend))
    );
  };
};
