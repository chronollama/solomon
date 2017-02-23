export const objectToArray = (object) => {
  return Object.keys(object).map((key) => {
    return object[key];
  });
};

export const debtDirection = (currentUserId, debtorId) => {
  return (currentUserId === debtorId) ? "debtor" : "creditor";
};
