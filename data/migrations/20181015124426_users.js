exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();

    tbl
      .string('username', 128)
      .notNullable()
      .unique();

    tbl.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('users');
};
