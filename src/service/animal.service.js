const { AnimalCategory } = require("../model/category.model");
const mongoose = require("mongoose");
const createAnimalService = async (data) => {
  // console.log(data)
  const category = await AnimalCategory.findOne({
    category_id: data.category_id,
  });
  console.log("category: ", category);
  if (!category) {
    return null;
  }
  console.log(data);
  category.animals.push({ name: data.name, image_url: data.image_url });

  const newAnimals = await category.save();

  return {
    category: newAnimals.name,
    animal: newAnimals.animals[category.animals.length - 1],
  };
};

const getAnimalsService = (category) => {
  return AnimalCategory.aggregate([
    // { $match: { _id: mongoose.Types.ObjectId(category.id) }   },
    { $match: category },
    { $unwind: "$animals" },
    { $project: { _id: 0, category: "$name", animal: "$animals" } },
  ]);
};

const getAnimalsService_x = (category) => {
  // let aggregationPipeline = [];

  // if (categoryId) {
  //   // If categoryId is provided, match against the category ID
  //   aggregationPipeline.push({
  //     $match: { _id: mongoose.Types.ObjectId(categoryId) },
  //   });
  // }

  // // Unwind the animals array
  // aggregationPipeline.push({ $unwind: "$animals" });

  // // Project to reshape the output
  // aggregationPipeline.push({
  //   $project: { _id: 0, category: "$name", animal: "$animals" },
  // });

  // // Perform aggregation
  // return AnimalCategory.aggregate(aggregationPipeline);

  return AnimalCategory.find(category);
};

module.exports = { createAnimalService, getAnimalsService };
