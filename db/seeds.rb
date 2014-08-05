u1 = User.create(email: 'kristen', password: 'kristen')
u2 = User.create(email: 'guestlogin', password: 'guestlogin')
u3 = User.create(email: 'guest', password: 'guest')

b1 = u1.boards.create(title: 'Workout')
b2 = u1.boards.create(title: 'School')
b3 = u1.boards.create(title: 'Work')
b3 = u1.boards.create(title: 'Home')

b4 = u2.boards.create(title: 'Workout')
b5 = u2.boards.create(title: 'School')
b6 = u2.boards.create(title: 'Work')
b7 = u2.boards.create(title: 'Home')

l1 = b1.lists.create(title: 'Todo')
l2 = b1.lists.create(title: 'Doing')
l3 = b1.lists.create(title: 'Done')

l4 = b4.lists.create(title: 'Todo')
l5 = b4.lists.create(title: 'Doing')
l6 = b4.lists.create(title: 'Done')

c1 = l3.cards.create(title: 'squats', description: 'feel the burn')
c2 = l3.cards.create(title: 'pushups', description: 'ooh ouch')
c3 = l3.cards.create(title: 'situps', description: 'ouchy')

c4 = l1.cards.create(title: 'squats', description: 'feel the burn')
c5 = l1.cards.create(title: 'pushups', description: 'ooh ouch')
c6 = l1.cards.create(title: 'situps', description: 'ouchy')

c7 = l2.cards.create(title: 'squats', description: 'feel the burn')
c8 = l2.cards.create(title: 'pushups', description: 'ooh ouch')
c9 = l2.cards.create(title: 'situps', description: 'ouchy')

# i1 = c1.items.create(done: false, title: 'mocha')
# i2 = c1.items.create(done: true, title: 'mocha')
# i3 = c1.items.create(done: true, title: 'cookie')
#
# b1.members = [u2]
# b1.save
