
exports.seed = function(knex) {
  return knex('users').truncate() //reset primary keys
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Maby', password: 12345},
        {username: 'Mark', password: 12345},
        {username: 'Tony', password: 12345}
      ]);
    });
};
