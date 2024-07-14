import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import { postLogin, postSignup } from "./controllers/User.js";
import { getTransactions, postTransaction } from "./controllers/Transaction.js";

const app = express();
app.use(express.json());
app.use(cors());

//Connect to db
const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  if (conn) {
    console.log("Db connected 🚀");
  } else {
    console.log("Db not connected ❌");
  }
};
connectDb();

const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.json({
    message: `Server is running`,
  });
});

app.post("/signup", postSignup);

app.post("/login", postLogin)

app.post("/transaction", postTransaction)

app.get("/transactions", getTransactions)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
