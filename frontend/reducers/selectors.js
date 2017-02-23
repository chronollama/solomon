export const friendsArray = (friends) => {
  return Object.keys(friends).map((key) => {
    return friends[key];
  });
};

export const billsArray = (bills) => {
  const result = Object.keys(bills).map((key) => {
    return bills[key];
  });
  return result;
};

export const debtDirection = (currentUserId, debtorId) => {
  return (currentUserId === debtorId) ? "debtor" : "creditor";
};
