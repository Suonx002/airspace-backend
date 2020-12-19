// Update with your config settings.
const dotenv = require('dotenv').config({ path: './configs.env' })


module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  }

};
