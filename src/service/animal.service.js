const { AnimalCategory } = require("../model/category.model");
const mongoose = require('mongoose');
const createAnimalService = async (data) => {
  const category = await AnimalCategory.findById(data.id);
  if (!category) {
    return null;
  }

  category.animals.push({ name: data.name, image_url: data.image_url });
  return category.save();
};

// const getAnimalsService = (category) => {
//   return AnimalCategory.aggregate([
//     // { $match: { _id: mongoose.Types.ObjectId(category.id) }   },
//     { $match: { _id: mongoose.Types.ObjectId(category.id) } },
//     { $unwind: "$animals" },
//     { $project: { _id: 0, category: "$name", animal: "$animals" } },
//   ]);
// };

const getAnimalsService = (categoryId) => {
  let aggregationPipeline = [];
  
  if (categoryId) {
    // If categoryId is provided, match against the category ID
    aggregationPipeline.push({ $match: { _id: mongoose.Types.ObjectId(categoryId) } });
  }
  
  // Unwind the animals array
  aggregationPipeline.push({ $unwind: "$animals" });

  // Project to reshape the output
  aggregationPipeline.push({ $project: { _id: 0, category: "$name", animal: "$animals" } });

  // Perform aggregation
  return AnimalCategory.aggregate(aggregationPipeline);
  // return AnimalCategory.find(category, "animals")
};

module.exports = { createAnimalService, getAnimalsService };
