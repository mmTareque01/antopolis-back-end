const { response, status } = require("../config/response.config");
const {
  createCategoryService,
  getAllCaretoriesService,
} = require("../service/category.service");
const { v4: uuidv4 } = require("uuid");

const createCategory = async (req, res) => {
  try {
    const newCategory = await createCategoryService({
      name: req.body.name,
      category_id: uuidv4(),
    });
    res.status(200).json(response(newCategory, status.created_status));
  } catch (error) {
    console.log(error);
    res.status(200).json(response(newAnimal, status.error_status));
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategory = await getAllCaretoriesService();
    if (!allCategory.length) {
      return res.status(200).json(response([], status.not_found_error_status));
    }
    res.status(200).json(response(allCategory, status.success_status));
  } catch (error) {
    console.log(error);
    res.status(200).json(response(newAnimal, status.error_status));
  }
};

module.exports = { createCategory, getCategories };
