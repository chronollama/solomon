User.destroy_all

user1 = User.create(email: 'guest@solomon.com', name: 'Guest', password: 'solomon')
user2 = User.create(email: 'a', name: 'a', password: 'aaaaaa')
user3 = User.create(email: 'asdf', name: 'asdf', password: 'asdfasdf')
user4 = User.create(email: 'bobbington', name: 'bobbington', password: 'bobbington')
user5 = User.create(email: 'manhattan', name: 'manhattan', password: 'manhattan')
user6 = User.create(email: 'brooklyn', name: 'brooklyn', password: 'brooklyn')


Friendship.create(user_id: user1.id, friend_id: user2.id)
Friendship.create(user_id: user1.id, friend_id: user3.id)
Friendship.create(user_id: user1.id, friend_id: user4.id)
Friendship.create(user_id: user1.id, friend_id: user5.id)
Friendship.create(user_id: user1.id, friend_id: user6.id)
Friendship.create(user_id: user2.id, friend_id: user3.id)
Friendship.create(user_id: user2.id, friend_id: user4.id)
Friendship.create(user_id: user2.id, friend_id: user5.id)
Friendship.create(user_id: user2.id, friend_id: user6.id)
Friendship.create(user_id: user3.id, friend_id: user6.id)
Friendship.create(user_id: user4.id, friend_id: user6.id)
Friendship.create(user_id: user5.id, friend_id: user6.id)
Friendship.create(user_id: user3.id, friend_id: user4.id)
