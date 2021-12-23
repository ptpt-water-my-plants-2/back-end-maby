const db = require('../data/db-config');

function findBy(filter) {
    return db('users')
        .select('user_id', 'username', 'password')
        .where(filter)
}

function findById(id) {
    return db('users')
        .select('user_id','username','password')
        .where('user_id', id)
        .first()
}

async function add({firstName, lastName, username, password ,phoneNumber}) {
    const [user_id] = await db('users').insert({ firstName, lastName, username, password ,phoneNumber})
    return findById(user_id)
}

module.exports = {
    findBy,
    findById,
    add,
};