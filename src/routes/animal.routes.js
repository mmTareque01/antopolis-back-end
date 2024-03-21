const express = require("express");
const { createAnimal, getAnimals, upload } = require("../controllers/animal");
const animalRouter = express.Router();

animalRouter.post("/create", upload.single('image'),createAnimal)
animalRouter.get("/list", getAnimals)

module.exports = {animalRouter}
