const express = require('express');
const db = require('../data/helpers/index.js');

const router = express.Router();

// MIDDLEWARE
const protected = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res
      .status(401)
      .json({ message: `YOU SHALL NOT PASS... You are not authorized.` });
  }
};

router.get('/', protected, (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
