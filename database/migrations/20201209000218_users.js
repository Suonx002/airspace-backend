
// up is migration 
exports.up = knex => knex.schema.createTable('users', table => {

    table.increments();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();

    table.datetime('createdAt');
    table.datetime('updatedAt');
})

//down is rollback
exports.down = knex => knex.schema.dropTable('users');
