import { RECEIVE_BILLS,
  RECEIVE_BILL,
  REMOVE_BILL } from '../actions/bill_actions';

const billsReducer = (state = {}, action) => {
  Object.freeze(state);
  let copy = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_BILLS:
      return action.bills;
    case RECEIVE_BILL:
      return Object.assign({}, state, {[action.bill.id]: action.bill});
    case REMOVE_BILL:
      delete copy[action.bill.id];
      return copy;
    default:
      return state;
  }
};

export default billsReducer;
