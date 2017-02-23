export const searchUsers = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/users',
    data: {query}
  });
};

export const searchFriends = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/friendships',
    data: {query}
  });
};
