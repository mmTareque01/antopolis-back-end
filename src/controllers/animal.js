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

    // console.log("img", result);
    console.log(req.body)

    const newAnimal = await createAnimalService({
      name: req.body.name,
      image_url: result.secure_url,
      category_id: req.body.category_id,
    });

    // const newAnimal = await createAnimalService({
    //   name: "birds_1",
    //   image_url:
    //     "https://res.cloudinary.com/dofzdulgj/image/upload/v1711045325/antopolis/sk0clgtj9gq0dtjdbnfc.jpg",
    //   category_id: "82e0dbf2-3b85-403e-a801-4d0a808a497",
    // });
    if (!newAnimal) {
      console.log("error");
      return res.status(200).json(response({}, status.client_error_status));
    }
    res.status(200).json(response(newAnimal, status.created_status));
  } catch (error) {
    console.log(error);
    res.status(200).json(response({}, status.error_status));
  }
};

const getAnimals = async (req, res) => {
  try {
    let filter = {};
    if (req.query.q) {
      filter = { category_id: req.query.q };
    }

    const animals = await getAnimalsService(filter);
    if (!animals.length) {
      return res.status(200).json(response([], status.not_found_error_status));
    }

    res.status(200).json(response(animals, status.success_status));
  } catch (error) {
    console.log(error);
    res.status(200).json(response({}, status.error_status));
  }
};

module.exports = { createAnimal, getAnimals, upload };
