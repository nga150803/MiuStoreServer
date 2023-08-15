import mongoose ,{Document} from "mongoose";

export interface IProduct extends Document {
    name: string;
  
  }
  
  const CategorySchema = new mongoose.Schema<IProduct>({
    name: { type: String },
   
  });

  export default mongoose.model<IProduct>("Category_Miu", CategorySchema);
