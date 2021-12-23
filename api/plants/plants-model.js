const db = require("../data/db-config")

const getPlantsByUserId = (user_id) => {
    return db("plants as p")
        .select("p.plantId", "p.nickname", "p.species", "p.h2OFrequency", "p.howMuchWater", "p.details")
        .join("users as u", "p.owner", "=", "u.user_id")
        .where("p.owner", user_id)
        .orderBy("p.plantId", "desc")
}



const getPlantByPlantId = (plantId) => {
    return db("plants")
        .where({ plantId })
        .first()
}


async function addPlant(newPlant) {
    const [plantId] = await db('plants').insert(newPlant).returning('plantId')
    return getPlantByPlantId(plantId)
}


async function updatePlant(plantId, changes) {
    const updatedPlant = await db("plants").where({ plantId }).update(changes)
    console.log(updatedPlant)

    return getPlantByPlantId(plantId)
}

const deletePlant = (plantId) => {
    return db('plants').where({ plantId }).del()
}







module.exports = { 
    getPlantsByUserId, 
    getPlantByPlantId, 
    addPlant, 
    updatePlant, 
    deletePlant 
}