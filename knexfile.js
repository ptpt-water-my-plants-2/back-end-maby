require('dotenv').config()

const pg = require('pg')
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}
const sharedConfig = {
  client: 'pg',
  useNullAsDefault: true,
  migrations: {
    directory: './api/data/migrations',
  },
  seeds: {
    directory: './api/data/seeds',
  },
  pool:{
    afterCreate: (conn, done) => {
     conn.run('PRAGMA foreign_keys = ON', done)
          },
  }

}
module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10},
  }
}
// DEVELOPEMT

// const sharedConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   migrations: {
//     directory: './api/data/migrations',
//   },
//   seeds: {
//     directory: './api/data/seeds',
//   },
//   pool: {
//     afterCreate: (conn, done) => {
//       conn.run('PRAGMA foreign_keys = ON', done)
//     },
//   },
// }
// module.exports = {
//   development: {
//     ...sharedConfig,
//     connection: { filename: './api/data/database.db3' },
//   },
//   testing: {
//     ...sharedConfig,
//     connection: { filename: './api/data/testing.db3' },
//   },
// }