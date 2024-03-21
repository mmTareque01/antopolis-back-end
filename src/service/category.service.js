const { AnimalCategory } = require("../model/category.model");

const createCategoryService = (data) => {
  return new AnimalCategory(data).save();
};

const getAllCaretoriesService = () => {
  return AnimalCategory.find({}, "name id");
};

module.exports = { createCategoryService, getAllCaretoriesService };
