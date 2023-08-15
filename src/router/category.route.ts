import express from "express";

import categoryController from "../controllers/category.controller";

export default (router: express.Router) => {
  router.get("/category", categoryController.getAllCategory);
  router.post("/category/add", categoryController.createCategory);
  // Get a specific category by ID
  router.get("/category/:id", categoryController.getCategoryById);
  // Update an existing category
  router.put("/category/:id", categoryController.updateCategory);

  // Delete an existing category
  router.delete("/category/:id", categoryController.deleteCategory);
};
