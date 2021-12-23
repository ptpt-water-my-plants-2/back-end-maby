const router = require('express').Router();
const Users = require('./users-model');
const { restricted } = require('../auth/auth-middleware')



router.get('/', restricted, async (req, res) => {
    res.json(await Users.getAllUsers())
  })
  

module.exports = router;