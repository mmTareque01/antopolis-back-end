const express = require("express");
const { createCategory, getCategories } = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory)
categoryRouter.get("/list", getCategories)

module.exports = {categoryRouter}
