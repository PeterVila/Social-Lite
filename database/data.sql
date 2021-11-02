insert into "users" ("username", "password", "avatarUrl", "email")
values ('petervila', 'monkey', 'test.jpg', 'pvj@email.com'),
       ('datboi', 'pass123', 'avatar.jpg', 'poop@email.com'),
       ('ohboi', 'pass', 'lol.jpg', 'ae@email.com');
;

insert into "posts" ("userId", "postType", "imageUrl","caption", "eventDate", "location")
values (1, 'event', 'pog.jpg', 'melon', null, 'your moms house'),
       (3, 'memory', 'img.jpg', null, '06-19-1998', 'earth');


insert into "eventAttendees" ("userId", "postId")
values(1, 1), (2,1), (3,2);

insert into "chatroom" ("userId", "message", "chatroomName")
values (1, 'hello ooOoo', '626nightMarket');

insert into "comments" ("userId", "postId", "content")
values(1, 1, 'wow much wow')
