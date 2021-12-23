const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.status(200).json(
      {
          "status": 200,
          "message": 'Welcome! Lets party with plants!',
          "time": new Date().toLocaleTimeString(),
      });
})
//catch all endpoint
server.use('*', (req, res) => {
  res.status(404).json({
      message: 'path not found',
  })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server

// https://buildweek-plants.herokuapp.com/