import dotenv from "dotenv";
dotenv.config();
export const {
  SERVER_PORT,
  DEBUG_MODE,
  MONGO_URL,
  JWT_SECRET,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_KEY_ID,
} = process.env;
