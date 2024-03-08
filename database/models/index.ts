import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected Successfully!!!`);
  } catch (error) {
    console.error(`Error connecting to DB`, error);
  }
};

export default connectToDB