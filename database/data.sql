insert into "users" ("username", "password", "avatarUrl", "email")
values ('petervila', 'monkey', 'test.jpg', 'pvj@email.com'),
       ('datboi', 'pass123', 'avatar.jpg', 'poop@email.com'),
       ('ohboi', 'pass', 'lol.jpg', 'ae@email.com');
;

insert into "posts" ("userId", "postType", "postTitle", "imageUrl", "caption", "eventDate", "endTime", "location")
values (1, 'event', 'Kennifer' , '/images/kennifer.jpg', 'this is a caption', '2021-11-25T10:00:00Z', '2021-11-25T18:00:00Z', 'LearningFuze');


insert into "eventAttendees" ("userId", "postId")
values(1, 1), (1,1), (2,1);

insert into "chatroom" ("userId", "message", "chatroomName")
values (1, 'hello ooOoo', '626nightMarket');

insert into "comments" ("userId", "postId", "content")
values(1, 1, 'wow much wow');
