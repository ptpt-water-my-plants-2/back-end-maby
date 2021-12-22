const knex = require('knex')
const configs = require('../../knexfile')

// Determine which environment is going to be run in Heroku
// and determine whicn file environment will knex query
module.exports = knex(configs[process.env.NODE_ENV])
