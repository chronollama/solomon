import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/session_actions';

const defaultState = {currentUser: null, errors: []};
// NOT GLOBAL STATE. SLICE OF STATE GIVEN BY ROOT REDUCER
// const defaultState = {session: {currentUser: null, errors: []}};

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let copy = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      copy.currentUser = action.currentUser;
      copy.errors = [];
      return copy;
    case RECEIVE_ERRORS:
      copy.errors = action.errors;
      return copy;
    case CLEAR_ERRORS:
      copy.errors = [];
      return copy;
    default:
      return state;
  }
};

export default SessionReducer;
