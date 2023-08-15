  import mongoose, { Document } from "mongoose";

  interface IAuthentication {
    password: string;
    salt: string;
    sessionToken: string;
  }

  export interface IUser extends Document {
    username: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    address: string;
    status: string;
    role: string;
    authentication: IAuthentication;
  }

  const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    avatar: { type: String },
    address: { type: String },
    status: { type: String, default: "active" },
    role: { type: String, default: "user" },
    authentication: {
      password: { type: String, required: true },
      salt: { type: String },
      sessionToken: {
        type: String,
      },
    },
  });

  export default mongoose.model<IUser>("User_Miu", UserSchema);
