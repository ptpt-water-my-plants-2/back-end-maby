const router = require('express').Router();
const Users = require('./users-model');
const Plants = require('../plants/plants-model');
const { restricted } = require('../auth/auth-middleware')
const { checkIdExists } = require('./users-middleware')


router.get('/', async (req, res, next) => {
    try{
      const users = await Users.getAllUsers()
      if(users) {
        res.status(200).json(users)
      } else {
        res.status(500).json({ message: "Users could not be retrieved" })
      }

    } catch(err) {
      next(err)
    }
  })

router.get('/:id',   async (req, res, next) => {
  console.log('id',req.params.id)
    try{
      const user = await Users.findById(req.params.id)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "User not found" })
      }
    } catch(err){
      next(err)
    }
})

router.get("/:user_id/users-plants", checkIdExists, async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const plantsList = await Plants.getPlantsByUserId(user_id)
      if(plantsList) {
        res.status(200).json(plantsList);
      } else {
        next({ message: "Users Plants could not be retrieved by the database." })
      }

    } catch(err) {
      next(err)
    }
    
      },
);

module.exports = router;