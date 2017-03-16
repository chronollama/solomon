export const RECEIVE_BILL_ERRORS = 'RECEIVE_BILL_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const receiveBillErrors = (errors) => {
  return {
    type: RECEIVE_BILL_ERRORS,
    errors
  };
};

// TODO: refactor errors to its own actions/reducer
