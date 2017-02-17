export const friendsArray = (friends) => {
  return Object.keys(friends).map((key) => {
    return friends[key];
  });
};
