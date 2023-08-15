import BillSchema, { IBill } from "../models/bill";
import UserSchema, { IUser } from "../models/users";

class BillService {
  async createBill(account: Record<string, any>) {
    return await new BillSchema(account).save().then((data) => data.toObject());
  }

  async getAllBill() {
    const bill = await BillSchema.find();
    return bill;
  }

  async getBillById(_id: string) {
    const res = await BillSchema.findOne({ _id });

    const user = await UserSchema.findOne({ _id: res.userId });

    const result = {
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      products: res.products,
      address: res.address,
      phoneNumber: res.phoneNumber,
      total: res.total,
      payment: res.payment,
    };

    return result;
  }

  async removeBill(_id: string) {
    const result = await BillSchema.deleteOne({ _id });
    console.log("Deleted bill:", result);
  }
}

export default new BillService();
