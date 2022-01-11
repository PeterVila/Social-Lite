
insert into "users" ("username", "hashedPassword", "displayName", "avatarUrl", "description")
values ('demo', 'demo', 'Demo User', 'demo.png', 'This is a demo account'), ('peter', 'peter', 'Peter', 'peter.jpeg', 'Creator of Social-Lite');

insert into "posts" ("userId", "postType", "postTitle", "imageUrl", "caption", "eventDate", "endTime", "location", "avatarUrl")
values (1, 'event', 'This is an event-type post 😄', 'lfz.jpeg', 'You can add yourself to the list of attendedes!', '2021-11-15T18:00:00Z', '2021-11-16T02:00:00Z', 'LearningFuze', '/images/peter.jpeg'),(1, 'memory', 'This is an memory-type post 😎', 'dao.jpg', 'You can leave comments on memory-posts', null, null, 'Winter', 'peter.jpeg');

insert into "eventAttendees" ("userId", "postId", "attendeeId", "avatarUrl")
values('2', '1', '1', 'peter.jpeg')
