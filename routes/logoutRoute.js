const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send({ err });
      } else {
        res.send('Good Bye!');
      }
    });
  }
});

module.exports = router;
