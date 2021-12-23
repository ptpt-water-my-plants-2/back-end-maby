const Plants = require("./plants-model")


const checkPlantIdExists = async (req, res, next) => {

    try{
        const plant = await Plants.getPlantByPlantId(req.params.plantId)
        if(!plant) {
            res.status(404).json(
                 { message: "Plant not found" })
        } else {
            next()
        }

    } catch(err){
        next(err)
    }

}

const validatePlant = (req, res, next) => {
    if (!req.body.nickname || !req.body.h2OFrequency || !req.body.species || !req.body.owner) {
        return res.status(400).json(
            { message: "Missing credentials" }
            )
    } else {
        next()
    }
}

module.exports = { 
    checkPlantIdExists, 
    validatePlant
}