import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  description_detail: string;
  category: string;
  price: number;
  Views: number;
}

const ProductsSchema = new mongoose.Schema<IProduct>({
  name: { type: String },
  image: { type: String },

  description: { type: String },
  description_detail: { type: String },
  category: { type: String },
  price: { type: Number },
  Views: { type: Number },
});

export default mongoose.model<IProduct>("Product_Miu", ProductsSchema);
