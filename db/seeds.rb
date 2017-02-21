User.destroy_all
Friendship.destroy_all
Bill.destroy_all

user1 = User.create(email: 'guest@solomon.com', name: 'Guest', password: 'solomon')
user2 = User.create(email: 'a', name: 'a', password: 'aaaaaa')
user3 = User.create(email: 'asdf', name: 'asdf', password: 'asdfasdf')
user4 = User.create(email: 'bobbington@bob.com', name: 'bobbington', password: 'bobbington')
user5 = User.create(email: 'manhattan@aa.io', name: 'manhattan', password: 'manhattan')
user6 = User.create(email: 'brooklyn@aa.io', name: 'brooklyn', password: 'brooklyn')

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

Bill.create(category: 'entertainment', description: 'Star Wars XIV', total: 13, date: Date.parse('28-12-2020'), notes: 'Luke is his own father!')
Bill.create(description: 'Chipotle', total: 8.50, date: Date.parse('12-2-2017'))
