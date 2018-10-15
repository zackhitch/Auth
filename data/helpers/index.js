const db = require('../dbConfig.js');

module.exports = {
  registerUser(user) {
    return db('users')
      .insert(user)
      .into('users');
  },

  loginUser(user) {
    return db('users')
      .where({ username: user.username })
      .first();
  },

  getUsers() {
    db('users').select('id', 'username');
  },
};
