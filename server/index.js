/* eslint-disable */
require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

  const clients = [];

io.on('connection', socket => {
  clients.push(socket.id);

  socket.emit('getCount', clients.length);
  
  console.log(`User Connected: ${socket.id}`);
  socket.on('join_room', data => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined the chatroom!`);
    console.log(clients);
  });
  socket.on('send_message', data => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
    clients.splice(clients.indexOf(socket.id), 1);
    console.log(clients);
  });
});
app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/comments/', (req, res, next) => {
  const {
    userId,
    content,
    postId,
    username,
    avatarUrl
  } = req.body;
  if (!content || !postId) {
    throw new ClientError(400, 'postId and content');
  }
  const sql = `
    insert into "comments" ("userId", "content", "postId", "username", "avatarUrl")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [userId, content, postId, username, avatarUrl];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/posts/', uploadsMiddleware, (req, res, next) => {
  const {
    userId,
    postType,
    caption,
    location,
    eventDate,
    postTitle,
    endTime,
    avatarUrl
  } = req.body;
  if (!userId || !postType || !location || !postTitle) {
    throw new ClientError(400, 'userId, postType, location, postTitle are required fields');
  }
  if (!req.file) {
    throw new ClientError(400, 'imageUrl is a required field');
  }
  const imageUrl = req.file.location;
  const sql = `
    insert into "posts" ("userId", "postType", "imageUrl", "caption", "location", "eventDate", "postTitle", "endTime", "avatarUrl")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *
  `;
  const params = [userId, postType, imageUrl, caption, location, eventDate, postTitle, endTime, avatarUrl];
  db.query(sql, params)
    .then(result => {
      const [upload] = result.rows;
      res.status(201).json(upload);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
  SELECT "posts"."postId", "posts"."userId", "postTitle", "postType", "imageUrl", "caption", "eventDate", "endTime", "location", "posts"."createdAt", "posts"."avatarUrl",
    JSON_AGG("comments".* ORDER BY "comments"."createdAt") FILTER (WHERE "comments" is not null) as "comments",
    JSON_AGG("eventAttendees".*) FILTER (WHERE "eventAttendees" is not null) as "eventAttendees"
  FROM "posts"
  left JOIN "comments" USING ("postId")
  left JOIN "eventAttendees" using ("postId")
  group by "posts"."postId"
  order by "posts"."createdAt"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/comments', (req, res, next) => {
  const sql = `
  select *
    from "comments"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
  const {
    username,
    password,
    displayName,
    description
  } = req.body;
  if (!username || !password || !displayName || !description) {
    throw new ClientError(400, 'username, password, displayName, and decription');
  }
  if (!req.file) {
    throw new ClientError(400, 'avatarUrl is a required field');
  }
  const avatarUrl = req.file.location;
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "displayName", "avatarUrl", "description")
        values ($1, $2, $3, $4, $5)
        returning *
      `;
      const params = [username, hashedPassword, displayName, avatarUrl, description];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select *
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const {
        userId,
        hashedPassword,
        username,
        displayName,
        avatarUrl,
        description
      } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          } else {
            const payload = {
              userId,
              username,
              displayName,
              avatarUrl,
              description
            };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            res.json({
              token,
              user: payload
            });
          }
        });
    })
    .catch(err => next(err));
});

app.post('/api/auth/demo-sign-in', (req, res, next) => {
  const {
    username = debby,
      password = debby
  } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select *
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const {
        userId,
        username,
        displayName,
        avatarUrl,
        description
      } = user;
      const payload = {
        userId,
        username,
        displayName,
        avatarUrl,
        description
      };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      res.json({
        token,
        user: payload
      });
    })
    .catch(err => next(err));
});


app.get('/api/eventAttendees', (req, res, next) => {
  const sql = `
  select "userId", "postId", "avatarUrl", "attendeeId"
    from "eventAttendees"
    join "users" using ("userId")
    order by "attendeeId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/eventAttendees', (req, res, next) => {
  const {
    userId,
    postId,
    avatarUrl
  } = req.body;
  if (!userId || !postId) {
    throw new ClientError(401, 'Missing userId and/or postId')
  }
  const sql = `
    insert into "eventAttendees" ("userId", "postId", "avatarUrl")
    values ($1, $2, $3)
    returning *
  `
  const params = [userId, postId, avatarUrl];
  db.query(sql, params)
    .then(result => {
      const [attendee] = result.rows;
      res.status(201).json(attendee);
    })
    .catch(err => {
      next(err);
    });
});

app.delete('/api/eventAttendees', (req, res, next) => {
  const {
    userId,
    postId
  } = req.body
  if (!userId || !postId) {
    throw new ClientError(401, 'Missing userId and/or postId')
  }
  const sql = `
    delete from "eventAttendees"
     where "userId" = $1
       and "postId" = $2
  `;
  const params = [userId, postId];
  db.query(sql, params)
    .then(result => {
      const [attendee] = result.rows;
      res.status(201).json(attendee);
    })
    .catch(err => {
      next(err);
    });
});

app.delete('/api/posts/:postId', (req, res, next) => {
  const postId = parseInt(req.params.postId, 10);
  if (!Number.isInteger(postId) || postId < 1) {
    res.status(400).json({
      error: 'postId must be a positive integer'
    });
    return;
  }
  const sql = `
    DELETE from "posts"
     where "postId" = $1
     returning *
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      if (!post) {
        res.status(404).json({
          error: `cannot find todo with todoId ${postId}`
        });
        return;
      }
      res.json(post);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
