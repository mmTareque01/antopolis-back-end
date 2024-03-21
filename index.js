require("dotenv").config();
const express = require("express");
const { categoryRouter } = require("./src/routes/category.routes");
const { db } = require("./src/db/connection");
const { animalRouter } = require("./src/routes/animal.routes");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/category", categoryRouter);
app.use("/animal", animalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
