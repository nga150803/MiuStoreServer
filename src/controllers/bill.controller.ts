import express from "express";
import billService from "../services/bill.service";
import { IBill } from "../models/bill";

class BillController {
  async createBill(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const data: any = req.body;

      const products = data.products.map((product: any) => ({
        _id: product.id,
        amount: product.amount,
      }));

      const response = await billService.createBill({
        userId: data.userId,
        products: products,
        total: data.total,
        payment: data.payment,
        address: data.address,
        phoneNumber: data.phoneNumber,
      });

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllBill(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const bills = await billService.getAllBill();

      return res.status(200).json(bills);
    } catch (error) {
      next(error);
    }
  }

  async getBillById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const billId = req.params._id;
      const bill = await billService.getBillById(billId);

      return res.status(200).json(bill);
    } catch (error) {
      next(error);
    }
  }

  async DeleteBill(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const _id = req.params._id;

      await billService.removeBill(_id);

      return res.json("remove");
    } catch (error) {
      next(error);
    }
  }
}

export default new BillController();
