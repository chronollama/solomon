export const addFriend = (friend) => {
  return $.ajax({
    method: 'POST',
    url: 'api/friendships',
    data: {friend}
  });
};

export const removeFriend = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/friendships/:id'
  })
};
