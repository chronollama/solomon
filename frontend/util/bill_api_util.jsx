export const getBills = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/bills'
  });
};

export const getBill = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/bills/${id}`
  });
};


export const addBill = (bill, bill_shares) => {
  return $.ajax({
    method: 'POST',
    url: 'api/bills',
    data: {bill, bill_shares}
  });
};

export const updateBill = (bill, bill_shares) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/bills/${bill.id}`,
    data: {bill, bill_shares}
  });
};

export const deleteBill = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/bills/${id}`
  });
};
