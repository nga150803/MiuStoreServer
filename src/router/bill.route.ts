import billController from "../controllers/bill.controller";
import express from "express";

export default (router: express.Router) => {
  router.post("/bill/create", billController.createBill);
  router.get("/bill/all", billController.getAllBill);
  router.get("/bill/:_id", billController.getBillById);
  router.delete("/bill/:_id", billController.DeleteBill);
};
