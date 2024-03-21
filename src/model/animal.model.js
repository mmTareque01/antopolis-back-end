const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    }
  });

  module.exports = {AnimalSchema}