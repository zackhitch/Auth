const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/helpers/index.js');

const router = express.Router();

router.post('/', (req, res) => {
  const creds = req.body;

  db.loginUser(creds)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: `YOU SHALL NOT PASS!!!` });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
