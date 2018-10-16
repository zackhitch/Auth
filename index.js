const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig.js');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const port = 9010;
const registerRoutes = require('./routes/registerRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const logoutRoute = require('./routes/logoutRoute.js');
const restrictedRoutes = require('./routes/restrictedRoutes.js');

const server = express();

const sessionConfig = {
  secret: 'nobody.tosses.a.dwarf.!',
  name: 'monkey',
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 1,
  },
  store: new KnexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

// MIDDLEWARE
const restricted = (req, res, next) => {
  const path = req.path;
  if (path.includes('/api/restricted')) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.status(401).json({ message: `You are not authorized.` });
    }
  } else {
    next();
  }
};

server.use(session(sessionConfig));

server.use(helmet(), express.json());
server.use(restricted);

server.use('/register', registerRoutes);
server.use('/login', loginRoutes);
server.use('/api/users', userRoutes);
server.use('/logout', logoutRoute);
server.use('/api/restricted', restrictedRoutes);

server.listen(port, () =>
  console.log(`\n=== API running on port: ${port} ===\n`)
);
