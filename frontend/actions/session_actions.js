import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  debugger
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const clearErrors = (errors) => {
  return {
    type: CLEAR_ERRORS
  };
};

export const login = (user) => {
  return dispatch => {
    return APIUtil.login(user).then(
      (res) => dispatch(receiveCurrentUser(res)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};

export const logout = () => {
  return dispatch => {
    return APIUtil.logout().then(
      () => dispatch(receiveCurrentUser(null)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};

export const signup = (user) => {
  return dispatch => {
    return APIUtil.signup(user).then(
      (res) => dispatch(receiveCurrentUser(user)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
