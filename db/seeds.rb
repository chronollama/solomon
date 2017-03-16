User.destroy_all
Friendship.destroy_all
Bill.destroy_all
BillShare.destroy_all
Debt.destroy_all

user1 = User.create(email: 'guest@solomon.com', name: 'Guest', password: 'solomon')
user2 = User.create(email: 'iluvcorgis@england.co.uk', name: 'Elizabeth II', password: 'asdfasdf')
user3 = User.create(email: 'todd@dropify.com', name: 'Todd', password: 'asdfasdf')
user4 = User.create(email: 'eudie@gmail.com', name: 'Eudora', password: 'asdfasdf')
user5 = User.create(email: 'tibs@gmail.com', name: 'Tiberius', password: 'asdfasdf')
user6 = User.create(email: 'bob@bob.com', name: 'Bobbington', password: 'asdfasdf')
user7 = User.create(email: 'vilfred@gmail.com', name: 'Vilfred', password: 'asdfasdf')
user8 = User.create(email: 'aristo@demeter.io', name: 'Aristodemos', password: 'asdfasdf')
user9 = User.create(email: 'apollofmyeye@yahoo.com', name: 'Apollonius', password: 'asdfasdf')
user10 = User.create(email: 'email@email.email', name: 'Ascelin', password: 'asdfasdf')
user11 = User.create(email: 'cara@aol.com', name: 'Caratacus', password: 'asdfasdf')
user12 = User.create(email: 'hko@umich.edu', name: 'Harry', password: 'asdfasdf')
user13 = User.create(email: 'thecat@yahoo.com', name: 'Felix', password: 'asdfasdf')
user14 = User.create(email: 'dora@hotmail.com', name: 'Theodora', password: 'asdfasdf')
user15 = User.create(email: 'thorsten@gmail.com', name: 'Thorsten', password: 'asdfasdf')
user16 = User.create(email: 'callie@jupiter.com', name: 'Callisto', password: 'asdfasdf')
user17 = User.create(email: 'nymeria@jupiter.com', name: 'Ganymede', password: 'asdfasdf')
user18 = User.create(email: 'wisp@jupiter.com', name: 'Io', password: 'asdfasdf')
user19 = User.create(email: 'europa@jupiter.com', name: 'Europa', password: 'asdfasdf')
user20 = User.create(email: 'mimas@saturn.com', name: 'Mimas', password: 'asdfasdf')
user21 = User.create(email: 'titan@saturn.com', name: 'Titan', password: 'asdfasdf')
user22 = User.create(email: 'iapetus@saturn.com', name: 'Iapetus', password: 'asdfasdf')
user23 = User.create(email: 'rhea@saturn.com', name: 'Rhea', password: 'asdfasdf')
user24 = User.create(email: 'tethys@saturn.com', name: 'Tethys', password: 'asdfasdf')
user25 = User.create(email: 'dione@saturn.com', name: 'Dione', password: 'asdfasdf')
user26 = User.create(email: 'erasmus@gmail.com', name: 'Erasmus', password: 'asdfasdf')

Friendship.create(user_id: user1.id, friend_id: user2.id)
Friendship.create(user_id: user1.id, friend_id: user3.id)
Friendship.create(user_id: user1.id, friend_id: user4.id)
Friendship.create(user_id: user1.id, friend_id: user5.id)
Friendship.create(user_id: user1.id, friend_id: user6.id)
Friendship.create(user_id: user1.id, friend_id: user7.id)
Friendship.create(user_id: user1.id, friend_id: user8.id)
Friendship.create(user_id: user1.id, friend_id: user9.id)
Friendship.create(user_id: user1.id, friend_id: user10.id)
Friendship.create(user_id: user1.id, friend_id: user11.id)
Friendship.create(user_id: user1.id, friend_id: user12.id)
Friendship.create(user_id: user1.id, friend_id: user13.id)
Friendship.create(user_id: user1.id, friend_id: user14.id)
Friendship.create(user_id: user1.id, friend_id: user15.id)
Friendship.create(user_id: user1.id, friend_id: user16.id)
Friendship.create(user_id: user1.id, friend_id: user17.id)
Friendship.create(user_id: user2.id, friend_id: user4.id)
Friendship.create(user_id: user2.id, friend_id: user5.id)
Friendship.create(user_id: user2.id, friend_id: user6.id)
Friendship.create(user_id: user3.id, friend_id: user16.id)
Friendship.create(user_id: user3.id, friend_id: user17.id)
Friendship.create(user_id: user3.id, friend_id: user18.id)
Friendship.create(user_id: user3.id, friend_id: user19.id)
Friendship.create(user_id: user3.id, friend_id: user20.id)
Friendship.create(user_id: user3.id, friend_id: user21.id)
Friendship.create(user_id: user3.id, friend_id: user22.id)
Friendship.create(user_id: user3.id, friend_id: user23.id)
Friendship.create(user_id: user3.id, friend_id: user24.id)
Friendship.create(user_id: user3.id, friend_id: user25.id)
Friendship.create(user_id: user3.id, friend_id: user26.id)
Friendship.create(user_id: user4.id, friend_id: user6.id)
Friendship.create(user_id: user5.id, friend_id: user6.id)
Friendship.create(user_id: user3.id, friend_id: user4.id)

bill1 = Bill.new(category: 'Entertainment', description: 'Star Wars XIV', total: 50, date: Date.parse('28-12-2020'), notes: 'Luke is his own father!')
shares1 = {user1.id => 0, user2.id => 50,user3.id => 0,user4.id => 0}
bill1.make_records(shares1)

bill2 = Bill.new(category: 'Life', description: 'Dog!', total: 400, date: Date.parse('12-2-2017'))
shares2 = {user1.id => 100, user2.id => 300}
bill2.make_records(shares2)

bill3 = Bill.new(category: 'Food', description: 'donuts', total: 8, date: Date.parse('16-2-2017'), notes: 'sprinkles!')
shares3 = {user1.id => 5, user2.id => 3, user3.id => 0, user4.id => 0}
bill3.make_records(shares3)

bill4 = Bill.new(category: 'Home', description: 'Roomba', total: 300, date: Date.parse('8-4-2017'))
shares4 = {user1.id => 50, user8.id => 100, user6.id => 50, user15.id => 100}
bill4.make_records(shares4)

bill5 = Bill.new(category: 'General', description: 'Book on emergent AI', total: 50, date: Date.parse('10-4-2017'), notes: 'Are roombas supposed to talk?')
shares5 = {user1.id => 10, user8.id => 20, user6.id => 0, user15.id => 20}
bill5.make_records(shares5)

bill6 = Bill.new(category: 'General', description: 'I, Robot', total: 15, date: Date.parse('11-4-2017'))
shares6 = {user1.id => 0, user8.id => 15, user6.id => 0, user15.id => 0}
bill6.make_records(shares6)

bill7 = Bill.new(category: 'Home', description: 'Staircase construction materials', total: 1000, date: Date.parse('14-4-2017'), notes: "EXPRESS SHIPPING IT'S BREAKING THROUGH!")
shares7 = {user1.id => 400, user8.id => 300, user6.id => 150, user15.id => 150}
bill7.make_records(shares7)

bill8 = Bill.new(category: 'General', description: 'Anthropology book', total: 100, date: Date.parse('15-4-2017'), notes: 'I am a human. Definitely not a robot. Especially not a sentient vacuum.')
shares8 = {user1.id => 100, user8.id => 0, user6.id => 0, user15.id => 0}
bill8.make_records(shares8)

bill9 = Bill.new(category: 'Utilities', description: 'Water bill', total: 120, date: Date.parse('19-12-2016'))
shares9 = {user1.id => 40, user8.id => 40, user6.id => 20, user15.id => 20}
bill9.make_records(shares9)

bill10 = Bill.new(category: 'Food', description: 'Thai', total: 70, date: Date.parse('18-7-2016'), notes: 'I am a human. Definitely not a robot. Especially not a sentient vacuum.')
shares10 = {user1.id => 30, user17.id => 40, user16.id => 0}
bill10.make_records(shares10)

bill11 = Bill.new(category: 'Transportation', description: 'Car repairs', total: 300, date: Date.parse('15-9-2016'))
shares11 = {user1.id => 100, user10.id => 200}
bill11.make_records(shares11)

bill12 = Bill.new(category: 'Life', description: 'Birthday gift for mom', total: 100, date: Date.parse('20-7-2016'))
shares12 = {user1.id => 100, user5.id => 0}
bill12.make_records(shares12)

bill13 = Bill.new(category: 'General', description: 'Map of Middle Earth', total: 100, date: Date.parse('20-7-2016'))
shares13 = {user1.id => 0, user2.id => 50, user3.id => 50, user4.id => 0}
bill13.make_records(shares13)

bill14 = Bill.new(category: 'General', description: 'Stainless steel napkins', total: 423, date: Date.parse('20-7-2016'))
shares14 = {user1.id => 195, user2.id => 50, user3.id => 100, user4.id => 78}
bill14.make_records(shares14)

bill15 = Bill.new(category: 'General', description: 'Why did we get 15 pounds of jello?', total: 42, date: Date.parse('20-7-2016'))
shares15 = {user1.id => 12, user2.id => 16, user3.id => 8, user4.id => 6}
bill15.make_records(shares15)

bill16 = Bill.new(category: 'General', description: 'Woebegone lamp', total: 60, date: Date.parse('20-7-2016'))
shares16 = {user1.id => 0, user2.id => 0, user3.id => 0, user4.id => 60}
bill16.make_records(shares16)

bill17 = Bill.new(category: 'General', description: 'Magnificent cabbages', total: 100, date: Date.parse('20-7-2016'))
shares17 = {user1.id => 0, user2.id => 50, user3.id => 30, user4.id => 20}
bill17.make_records(shares17)

bill18 = Bill.new(category: 'General', description: 'Mountain of pancakes', total: 49, date: Date.parse('20-7-2016'))
shares18 = {user1.id => 0, user2.id => 40, user3.id => 0, user4.id => 9}
bill18.make_records(shares18)

bill19 = Bill.new(category: 'General', description: 'Coffee', total: 1234, date: Date.parse('20-7-2016'))
shares19 = {user1.id => 409, user2.id => 50, user3.id => 532, user4.id => 243}
bill19.make_records(shares19)

bill20 = Bill.new(category: 'General', description: 'Rent', total: 2000, date: Date.parse('20-7-2016'))
shares20 = {user1.id => 250, user2.id => 500, user3.id => 250, user4.id => 1000}
bill20.make_records(shares20)

bill21 = Bill.new(category: 'General', description: 'Goat cheese', total: 20, date: Date.parse('12-6-2019'))
shares21 = {user1.id => 0, user2.id => 4, user3.id => 12, user5.id => 4}
bill21.make_records(shares21)

bill22 = Bill.new(category: 'General', description: 'Bouncy castle', total: 400, date: Date.parse('12-6-2019'))
shares22 = {user1.id => 0, user2.id => 0, user7.id => 0, user5.id => 400}
bill22.make_records(shares22)

bill23 = Bill.new(category: 'General', description: '2/3 Silmarils', total: 5000, date: Date.parse('12-6-2019'))
shares23 = {user1.id => 1000, user2.id => 2000, user3.id => 1000, user5.id => 1000}
bill23.make_records(shares23)

bill24 = Bill.new(category: 'General', description: 'Refrigerator/toaster', total: 450, date: Date.parse('12-6-2019'))
shares24 = {user1.id => 50, user2.id => 200, user7.id => 150, user6.id => 50}
bill24.make_records(shares24)

bill25 = Bill.new(category: 'General', description: 'Linens', total: 60, date: Date.parse('12-6-2019'))
shares25 = {user1.id => 60, user7.id => 0, user5.id => 0, user6.id => 0}
bill25.make_records(shares25)

bill26 = Bill.new(category: 'General', description: 'Super Bowl snacks', total: 50, date: Date.parse('12-6-2019'))
shares26 = {user1.id => 14, user8.id => 5, user5.id => 11, user6.id => 20}
bill26.make_records(shares26)

bill27 = Bill.new(category: 'General', description: 'Mediterranean vacation', total: 7500, date: Date.parse('12-6-2019'))
shares27 = {user1.id => 1500, user8.id => 3000, user7.id => 750, user6.id => 2250}
bill27.make_records(shares27)
