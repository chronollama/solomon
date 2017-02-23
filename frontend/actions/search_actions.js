import * as APIUtil from '../util/search_api_util';

export const RECEIVE_FRIEND_SEARCH = 'RECEIVE_FRIEND_SEARCH';
export const RECEIVE_USER_SEARCH = 'RECEIVE_USER_SEARCH';

export const receiveFriendSearch = (friends) => {
  return {
    type: RECEIVE_FRIEND_SEARCH,
    friends
  };
};

export const receiveUserSearch = (users) => {
  return {
    type: RECEIVE_USER_SEARCH,
    users
  };
};

export const searchFriends = (query) => {
  return (dispatch) => {
    return APIUtil.searchFriends(query).then(
      (friends) => dispatch(receiveFriendSearch(friends))
    );
  };
};

export const searchUsers = (query) => {
  return (dispatch) => {
    return APIUtil.searchUsers(query).then(
      (users) => {
        dispatch(receiveUserSearch(users));
      }
    );
  };
};
