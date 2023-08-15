import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nev:nev@cluster0.rfeepoy.mongodb.net/";
// const MONGODB_URI = "mongodb://localhost:27017/nevsolit";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connect to MongoDB failed");
  }
};
