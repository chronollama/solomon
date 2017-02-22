export const friendsArray = (friends) => {
  return Object.keys(friends).map((key) => {
    return friends[key];
  });
};

export const billsArray = (bills) => {
  return Object.keys(bills).map((key) => {
    return bills[key];
  });
};

export const debtDirection = (currentUserId, debtorId) => {
  return (currentUserId === debtorId) ? "debtor" : "creditor";
};
