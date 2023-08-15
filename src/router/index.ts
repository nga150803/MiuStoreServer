import express from "express";
import productRoute from "./product.route";
import categoryRoute from "./category.route";
import authRoute from "./auth.route";
import billRoute from "./bill.route";
const router = express.Router();

export default (): express.Router => {
  productRoute(router);
  categoryRoute(router);
  authRoute(router);
  billRoute(router);

  return router;
};
