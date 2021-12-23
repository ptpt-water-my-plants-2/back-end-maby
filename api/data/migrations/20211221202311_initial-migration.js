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
      .createTable("plants", (plants) => {
        plants.increments("plantId");
        plants.string("nickname").notNullable();
        plants.string("species").notNullable();
        plants.string("h2OFrequency").notNullable();
        plants.string("howMuchWater")
        plants.string("details")
        plants.integer("owner") // --foreign key
            .unsigned()
            .notNullable()
            .references("user_id")
            .inTable("users") // --foreign key
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

    })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('plants')
    await knex.schema.dropTableIfExists('users')
  }
  