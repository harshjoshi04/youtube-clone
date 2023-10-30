import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const Dbconnection = async () => {
  let con = await mongoose.connect(process.env.DB_URL);
  if (con) {
    console.log("Db connection SuccessFully");
  }
};
