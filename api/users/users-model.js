const db = require('../data/db-config');

function getAllUsers() { 
    return db('users') 
}

// async function insertUser(user) {
//   const [newUserObject] = await db('users')
//         .insert(user, ['user_id', 'username', 'password'])
//   return newUserObject 
// }

function updateUserById(user_id, changes) {
  return db('users')
      .where('user_id', user_id)
      .update(changes)
      .then(data => {
          return getUserById(user_id) 
      })

}

function findById(user_id) {
    return db('users')
        .select('user_id','username','password')
        .where('user_id', user_id)
        .first()
}
function updateUserById(user_id, changes) {
  return db('users')
      .where('user_id', user_id)
      .update(changes)
      .then(data => {
          return getUserById(user_id) 
      })

}
function deleteUserById(user_id) {
  return db('users')
      .where('user_id', user_id)
      .del()
      .then(deletedUser => {
          return deletedUser  
      })
}



module.exports = {
    getAllUsers,
    deleteUserById,
    updateUserById,
    findById
};