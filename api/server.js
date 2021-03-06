const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')
const path = require('path')

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const plantsRouter = require('./plants/plants-router.js');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use(express.static(path.join(__dirname, '../client')))
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);

server.get('/', (req, res) => {
  res.status(200).json(
      {   "status": 200,
          "message": 'Welcome!!!'
      });
})
//catch all endpoint
server.use('*', (req, res) => {
  res.status(404).json({
      message: 'path not found',
  })
})

server.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server

// https://buildweek-plants.herokuapp.com/