import express from "express";

import ProductsController from "../controllers/products.controller";

export default (router: express.Router) => {
  router.get("/products", ProductsController.getAllProducts);
  router.post("/products/add", ProductsController.createProduct);
  // router.post("/products/add", ProductsController.addProduct);

  router.put("/products/edit/:id", ProductsController.updateProduct);

  //show sp nổi bật
  router.get("/products/new", ProductsController.getNewProducts);
  //show sp by views
  router.get("/products/popular", ProductsController.getNewProductView);
  // show sp detail by id
  router.get("/products/:_id", ProductsController.getProductById);
  // delete products
  router.delete("/products/:id", ProductsController.deleteProduct);
};
