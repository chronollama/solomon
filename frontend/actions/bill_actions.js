import * as APIUtil from '../util/bill_api_util';

export const RECEIVE_BILLS = 'RECEIVE_BILLS';
export const RECEIVE_BILL = 'RECEIVE_BILL';
export const REMOVE_BILL = 'REMOVE_BILL';

export const receiveBills = (bills) => {
  return {
    type: RECEIVE_BILLS,
    bills
  };
};

export const receiveBill = (bill) => {
  return {
    type: RECEIVE_BILL,
    bill
  };
};

export const removeBill = (bill) => {
  return {
    type: REMOVE_BILL,
    bill
  };
};

export const getBills = () => {
  return dispatch => {
    return APIUtil.getBills().then(
      (bills) => dispatch(receiveBills(bills))
    );
  };
};

export const getBill = (id) => {
  return dispatch => {
    return APIUtil.getBill(id).then(
      (bill) => dispatch(receiveBill(bill))
    );
  };
};

export const addBill = (bill, bill_shares) => {
  return dispatch => {
    return APIUtil.addBill(bill, bill_shares).then(
      (res) => dispatch(getBill(res.id))
    );
  };
};

export const updateBill = (bill, bill_shares) => {
  return dispatch => {
    return APIUtil.updateBill(bill, bill_shares).then(
      (res) => dispatch(getBill(res.id))
    );
  };
};

export const deleteBill = (id) => {
  return dispatch => {
    return APIUtil.deleteBill(id).then(
      (bill) => dispatch(removeBill(bill))
    );
  };
};
