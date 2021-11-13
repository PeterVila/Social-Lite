insert into "users" ("username", "hashedPassword", "displayName", "avatarUrl", "description")
values ('debby', 'debby', 'debby', '/images/debby.png', 'debby')
;

insert into "posts" ("userId", "postType", "postTitle", "imageUrl", "caption", "eventDate", "endTime", "location")
values (1, 'event', 'This is an event :)', '/images/dao-trong-le-reindeer.jpg', 'You cant comment on events but u can on memories', '2021-11-09T07:42:00Z', '2021-11-09T07:42:00Z', 'lfz');

insert into "eventAttendees" ("userId", "postId", "avatarUrl")
values(1, 1, '/images/debby.png');

insert into "chatroom" ("userId", "message", "chatroomName")
values (1, 'hello ooOoo', '626nightMarket');

