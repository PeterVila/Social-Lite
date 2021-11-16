insert into "users" ("username", "hashedPassword", "displayName", "avatarUrl", "description")
values ('debby', 'debby', 'debby', '/images/debby.png', 'debby'),
('jc', 'jc', 'jc', '/images/jc.jpg', 'jc');

insert into "posts" ("userId", "postType", "postTitle", "imageUrl", "caption", "eventDate", "endTime", "location", "avatarUrl")
values (1, 'event', 'This is an event-type post 😄', '/images/lfz.jpeg', 'You cant comment on events but you can on memory-type posts!', '2021-11-15T18:00:00Z', '2021-11-16T02:00:00Z', 'LearningFuze', '/images/peter.jpeg');

insert into "eventAttendees" ("userId", "postId", "avatarUrl")
values(1, 1, '/images/debby.png'),
(2,1,'/images/jc.jpg');

insert into "chatroom" ("userId", "message", "chatroomName")
values (1, 'chat message', '626nightMarket');

