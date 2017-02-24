import { RECEIVE_BILL_ERRORS, CLEAR_ERRORS } from '../actions/error_actions';

const errorReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = state.slice();

  switch (action.type) {
    case RECEIVE_BILL_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errorReducer;
