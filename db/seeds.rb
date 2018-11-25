# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



User.destroy_all

u1 = User.create name: 'Lily',  email: 'lily@ga.co', password: 'chicken', admin: true, profile_image: 'https://media.licdn.com/dms/image/C5603AQE1CL524FkoYw/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=4RVFxxdJb5Gfr1H9Ky4OsPXipmseeKJNkRwvwerE8pk'

u2 = User.create name: 'Behnam', email: 'behnam@ga.co', password: 'chicken', admin: false, profile_image: 'https://media.licdn.com/dms/image/C5603AQHiDNK8j0-vCA/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=70fGdTrKLTfjFJ3bWjDNuIOtUTv6A1aKmRBPfkWq1V4'

u3 = User.create name: 'Mary', email: 'mary@ga.co', password: 'chicken', admin: false, profile_image: 'https://media.licdn.com/dms/image/C4E03AQFFnjYF5FHhIw/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=XtHq8_-hmbR6SI__pVuHNxa6AAqfP1NNqI8oY7Q0koE'

puts "Created #{User.all.length} users."













Collection.destroy_all

c1 = Collection.create name: 'Christmas Movies', user_id: u1.id
c2 = Collection.create name: 'Best of 2018', user_id: u2.id
c3 = Collection.create name: 'Kids movies', user_id: u3.id
c4 = Collection.create name: 'Favourites', user_id: u1.id


puts "Created #{Collection.all.length} collections."





Movie.destroy_all

m1 = Movie.create themoviedb_id: 360920, release_date: "1995-10-20"

m2 = Movie.create themoviedb_id: 324234, release_date: "1995-10-20"

m3 = Movie.create themoviedb_id: 234234, release_date: "1995-10-20"



puts "Created #{Movie.all.length} movies."

c1.movies << m1 << m2
c2.movies << m3 << m1
c3.movies << m2 << m3





Review.destroy_all

rv1 = Review.create comment: "Funny and cute!
I saw this with my 4 and 7 year olds. They love the original Grinch cartoon. This movie is funny and cute. Nothing scary, nothing intense (I'm looking at you Incredibles 2). A great Christmas movie for all ages!!",  movie_id: m1.id, user_id: u1.id


rv2 = Review.create comment: "High emotional intelligence retelling of classic tale
In the original, the Grinch was truly mean to Max the dog; in this version they have a much kinder and more mutually enjoyable relationship. All the elements of the original cartoon are there, but the story is told in a way that pulls our empathy to every main character. The Grinch’s miserliness is explained with a backstory that has him as an orphan (no details on how or why) who sees Christmas being celebrated around him but who isn’t included in the holiday spirit — that’s what prompts him to head off to the cave. There’s some slapstick (things that would harm real humans but are pretty amusing when done by a cartoon) and absurd physics, but it’s all ultimately good-spirited. Characters of color are included (particularly the excellently and warmly voiced Kenan Thompson as a Who who seems to adore the Grinch despite his shortcomings), but the main characters we meet are white (or green). I really enjoyed it, and prefer it to the original cartoon.",  movie_id: m1.id, user_id: u2.id


rv3 = Review.create comment: "Just went to see the movie with 7,9,11 years old. They all enjoyed it very much and they are sensitive viewers. The graphics of the movie were very beautiful but what i like the most was the message to the audience, not only why (Grinch and other people in life might be miserable and unhappy) but also true meaning of Christmas, not thinking only about presents for yourself but making wishes for others. The Grinch apologise and becomes a better “person.” He is forgiven by town’s people and included in the local community for the first time in life. There are plenty of funny moments throughout, as well as many kindhearted characters. Highly recommend",  movie_id: m1.id, user_id: u3.id

puts "Created #{Review.all.length} reviews."


# m1.revieeews << rv1
# m2.reviews << rv2
# m3.reviews << rv3
