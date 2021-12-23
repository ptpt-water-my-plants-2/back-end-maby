const router = require("express").Router()
const Plants = require("./plants-model")
const { checkPlantIdExists, validatePlant} = require("./plants-middleware")

//get plant by plant Id
router.get("/:plantId", checkPlantIdExists, (req, res) => {
    Plants.getPlantByPlantId(req.params.plantId)
        .then(plant => {
            res.status(200).json(plant)
        })
        .catch(() => {
            res.status(500).json({ message: "The plant requested could not be retrieved" })
        })
})


router.post("/", validatePlant, async (req, res) => {
    Plants.addPlant(req.body)
        .then(newPlant => {
            res.status(201).json(newPlant)
        })
        .catch(() => {
            res.status(500).json({ message: "The plant was not added" })
        })
})

router.put("/:plantId", checkPlantIdExists, validatePlant, (req, res) => {
    Plants.updatePlant(req.params.plantId, req.body)
        .then(updatedPlant => {
            res.status(200).json(updatedPlant)
        })
        .catch(() => {
            res.status(500).json({ message: "The plant was not be updated " })
        })
})


// delete plant by Id
router.delete("/:plantId", checkPlantIdExists, (req, res) => {
    Plants.deletePlant(req.params.plantId)
        .then(deletedPlant => {
            res.status(200).json({ message: "Plant was successfully deleted! Goodbye dear Plant.  You will be missed." })
        })
        .catch(() => {
            res.status(500).json({ message: "The plant could not be deleted from the Database" })
        })
})



module.exports = router