import mongoose, { Document } from "mongoose";

export interface IProduct {
  id: string;
  amount: number;
}

export interface IBill extends Document {
  userId: string;
  products: IProduct[];
  total: number;
  payment: number;
  createdAt: Date;
  status: string;
  address: string;
  phoneNumber: string;
}
const BillSchema = new mongoose.Schema<IBill>({
  userId: { type: String },
  products: [{ id: String, amount: Number }],
  total: { type: Number },
  payment: { type: Number },
  address: { type: String },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now() },
  status: { type: String, default: "Chưa xác nhận" },
});

export default mongoose.model<IBill>("Bill_Miu", BillSchema);
