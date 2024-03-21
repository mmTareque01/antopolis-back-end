const { response, status } = require("../config/response.config");
const {
  createCategoryService,
  getAllCaretoriesService,
} = require("../service/category.service");

const createCategory = async (req, res) => {
  try {
    const newCategory = await createCategoryService({ name: req.body.name });
    res.status(200).json(response(newCategory, status.created_status));
  } catch (error) {
    console.log(error);
    res.status(500).json(response(newAnimal, status.error_status));
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategory = await getAllCaretoriesService();
    if (!allCategory.length) {
      return res.status(404).json(response({}, status.not_found_error_status));
    }
    res.status(200).json(response(allCategory, status.success_status));
  } catch (error) {
    console.log(error);
    res.status(500).json(response(newAnimal, status.error_status));
  }
};

module.exports = { createCategory, getCategories };
