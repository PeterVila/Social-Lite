
insert into "users" ("username", "hashedPassword", "displayName", "avatarUrl", "description")
values ('demo', 'demo', 'Demo User', '/images/demo.png', 'This is a demo account');

insert into "posts" ("userId", "postType", "postTitle", "imageUrl", "caption", "eventDate", "endTime", "location", "avatarUrl")
values (1, 'event', 'This is an event-type post 😄', '/images/lfz.jpeg', 'You cant comment on events but you can on memory-type posts!', '2021-11-15T18:00:00Z', '2021-11-16T02:00:00Z', 'LearningFuze', '/images/peter.jpeg');
