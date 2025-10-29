import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("🟢 Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.Mongodb_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};
