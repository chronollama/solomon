export const objectToArray = (object) => {
  return Object.keys(object).map((key) => {
    return object[key];
  });
};

export const debtRelationship = (currentUserId, debtorId) => {
  return (currentUserId === debtorId) ? "debtor" : "creditor";
};

export const myCredits = (friends) => {
  let credits = [];
  Object.keys(friends).forEach((id) => {
    const friend = friends[id];
    if (friend.net && friend.net.status === "creditor") {
      credits.push({id: friend.id, amount: friend.net.amount});
    }
  });
  return credits;
};

export const myDebts = (friends) => {
  let debts = [];
  Object.keys(friends).forEach((id) => {
    const friend = friends[id];
    if (friend.net && friend.net.status === "debtor") {
      debts.push({id: friend.id, amount: friend.net.amount});
    }
  });
  return debts;
};
