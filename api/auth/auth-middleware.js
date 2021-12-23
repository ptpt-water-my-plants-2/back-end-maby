const User = require('./auth-model.js')
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets') 


const checkUserExists = async(req, res, next ) => {
    try{
        const { username } = req.body 
        const newUser = await User.findBy({username})
        if(newUser[0]){
            next({
                status: 422,
                message:'The username is already taken'})
        } else {
            next()
        }
    } catch(err){
        next(err)
    }
}



const validateregister = async(req, res, next ) => {
    try{

        const {firstName, lastName, username , password ,phoneNumber} =  req.body
        if (!firstName || !lastName || !username || !password || !phoneNumber) {
            return res.status(400).json({ message: "Complete all fields" })
        // } else if(phoneNumber.length !== 10) {
        // return res.status(400).json({ message: "Phone number must contain ten digits" })

        } else if (password.length < 4) {
            return res.status(400).json({ message: "Password must be 4 characters or longer" })
        } else {
            next()
        }

    } catch(err){
        next(err)
    }
}

const validateBody = async(req, res, next ) => {
    try{

        const { username , password } =  req.body
        if(!username || !password ||
            typeof password !== 'string' || 
            !password.trim() || 
            !username.trim() ) {
                next({
                    status: 400,
                    message: 'username and password required'
                })

        } else {
            next()
        }

    } catch(err){
        next(err)
    }
}



function restricted(req, res, next) {
    const token = req.headers.authorization
    console.log('token',token)

    if(token){ // Validate token
        jwt.verify(token,secrets.jwtSecret ,(err,decodedToken )=>{
            if(err) {
                next({ status: 401, message:"token invalid"})
            } else {
                req.decodedJwt = decodedToken // return decoded token
                next()
            }
        }) 
    } else {
        res.status(401).json({message: "token required"})
    }
}

module.exports = {
    validateregister,
    checkUserExists,
    validateBody,
    restricted,
}