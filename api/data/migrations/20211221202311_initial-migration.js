exports.up = async (knex) => {
    await knex.schema
      .createTable('users', (users) => {
        users.increments('user_id')
        users.string("firstName").notNullable();
        users.string("lastName").notNullable();
        users.string('username', 200).notNullable()
        users.string('password', 200).notNullable()
        users.string("phoneNumber").notNullable();
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('users')
  }
  