const router = require('express').Router();
const jwt = require("jsonwebtoken") // creates token
const secrets = require('../../config/secrets')
const User = require('./auth-model.js')

const bcrypt = require('bcryptjs') // creates hash 
const { BCRYPT_ROUNDS } = require('../../config')

const { checkUserExists, validateBody,validateregister} = require('./auth-middleware')

router.post('/register',checkUserExists,validateregister,  async (req, res, next) => {

  try {
    
    const { firstName, lastName, username, password ,phoneNumber} = req.body
    // bcrypting the password before saving
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    // never save the plain text password in the db
    const user = { 'firstName':firstName, 
                  'lastName':lastName, 
                  'username': username , 
                  'password':hash , 
                  'phoneNumber': phoneNumber
                } 

    const NewUser = await User.add(user)
    res.status(201).json({'id': NewUser.user_id,
                        'username': NewUser.username,
                        'password': NewUser.password,
                      })
  } catch(err) {
    next(err)
  }
});
 
router.post('/login', validateBody,async (req, res, next) => {  
        const { username , password } = req.body 
        const newUser = await User.findBy({username})
        const user = newUser[0]
        if(user && bcrypt.compareSync(password, user.password) ){
        // generate a token and include it in the response
        const token = generateToken(user)
          res.status(200).json({
            message :`welcome, ${user.username}`,
            token: token
          })
        } else {
          next({ status: 401, message: 'invalid credentials' })
        }

});



function generateToken (user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  }

  const options = {
    expiresIn: '1d',
  }
  const secret = secrets.jwtSecret

  return jwt.sign(payload,secret,options)

}


module.exports = router;