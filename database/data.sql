insert into "users" ("username", "password", "avatarUrl", "email")
values ('petervila', 'monkey', 'test.jpg', 'pvj@email.com'),
       ('datboi', 'pass123', 'avatar.jpg', 'poop@email.com'),
       ('ohboi', 'pass', 'lol.jpg', 'ae@email.com');
;

insert into "posts" ("userId", "postType", "imageUrl", "caption", "location")
values (1, 'memory', 'pog.jpg', 'melon', 'your moms house'),
       (3, 'event', 'img.jpg', 'hello', 'earth');


insert into "eventAttendees" ("userId", "postId")
values(1, 1), (2,1), (3,2);

insert into "chatroom" ("userId", "message", "chatroomName")
values (1, 'hello ooOoo', '626nightMarket');

insert into "comments" ("userId", "postId", "content")
values(1, 1, 'wow much wow')
