const db = require('../data/db-config');

function getAllUsers() { 
    return db('users') 
}

async function insertUser(user) {
  const [newUserObject] = await db('users')
        .insert(user, ['user_id', 'username', 'password'])
  return newUserObject 
}

function updateUserById(user_id, changes) {
  return db('users')
      .where('user_id', user_id)
      .update(changes)
      .then(data => {
          return getUserById(user_id) 
      })

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
    insertUser,
    deleteUserById,
    updateUserById
};