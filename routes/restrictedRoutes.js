const express = require('express');
const db = require('../data/helpers/index.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from RESTRICTED!');
});

router.get('/users', (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
