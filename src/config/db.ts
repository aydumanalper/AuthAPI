import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from "../utils/logger";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string, {
      // Optional: Add mongoose connection options here
    });
    logger.info(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
