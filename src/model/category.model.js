const mongoose = require("mongoose");
const { AnimalSchema } = require("./animal.model");
const AnimalCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  animals: [AnimalSchema], // Embed animal schema as subdocument array
});

// Define the model for animal categories
const AnimalCategory = mongoose.model("AnimalCategory", AnimalCategorySchema);

module.exports = {AnimalCategory}