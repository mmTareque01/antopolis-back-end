const multer = require("multer");
const {
  createAnimalService,
  getAnimalsService,
} = require("../service/animal.service");
const { cloudinary } = require("../db/cloudinary");
const { response, status } = require("../config/response.config");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createAnimal = async (req, res) => {
  try {
    const base64String = req.file.buffer.toString("base64");

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      "data:image/jpeg;base64," + base64String,
      {
        folder: "antopolis",
      }
    );

    const newAnimal = await createAnimalService({
      name: req.body.name,
      image_url: result.secure_url,
      id: req.body.categoryId,
    });
    if (!newAnimal) {
      res.status(403).json(response({}, status.client_error_status));
    }
    res.status(200).json(response(newAnimal, status.created_status));
  } catch (error) {
    console.log(error);
    res.status(500).json(response({}, status.error_status));
  }
};

const getAnimals = async (req, res) => {
  try {
    let filter = {};
    if (req.query.q) {
      filter = { _id: req.query.q };
    }

    const animals = await getAnimalsService(req.query.q);
    // if (!animals) {
    //   return res.status(404).json(response([], status.not_found_error_status));
    // }

    res.status(200).json(response(animals.flat(), status.success_status));
  } catch (error) {
    console.log(error);
    res.status(500).json(response({}, status.error_status));
  }
};

module.exports = { createAnimal, getAnimals, upload };
