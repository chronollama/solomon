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

bill1 = Bill.new(category: 'entertainment', description: 'Star Wars XIV', total: 50, date: Date.parse('28-12-2020'), notes: 'Luke is his own father!')
bill2 = Bill.new(description: 'Chipotle', total: 26, date: Date.parse('12-2-2017'))
bill3 = Bill.new(category: 'food', description: 'donuts', total: 8, date: Date.parse('16-2-2017'), notes: 'sprinkles!')
shares1 = {user1.id => 0, user2.id => 50,user3.id => 0,user4.id => 0}
shares2 = {user1.id => 2, user2.id => 10,user3.id => 5,user4.id => 9}
shares3 = {user1.id => 5, user2.id => 3, user3.id => 0, user4.id => 0}
bill1.make_records(shares1)
bill2.make_records(shares2)
bill3.make_records(shares3)
