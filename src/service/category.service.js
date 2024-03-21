const { AnimalCategory } = require("../model/category.model");

const createCategoryService = (data) => {
  return new AnimalCategory(data).save();
};

const getAllCaretoriesService = () => {
  return AnimalCategory.find({}, "name id category_id");
};

module.exports = { createCategoryService, getAllCaretoriesService };
