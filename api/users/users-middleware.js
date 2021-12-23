const Users = require('./users-model.js')



const checkIdExists = async(req, res, next ) => {
    try{
        const { user_id } = req.params
        console.log('id',user_id)
        const newUser = await Users.findById(user_id)
        console.log(newUser)
        if(!newUser){
            next({
                status: 404,
                message:'The username was not found'
            })
        } else {
            next()
        }
    } catch(err){
        next(err)
    }
}

module.exports = {
    checkIdExists
}