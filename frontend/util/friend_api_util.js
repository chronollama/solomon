export const getFriends = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/friendships'
  });
};

export const getFriend = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/friendships/${id}`
  });
};


export const addFriend = (friend) => {
  return $.ajax({
    method: 'POST',
    url: 'api/friendships',
    data: {friend}
  });
};

export const deleteFriend = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/friendships/${id}`
  });
};
