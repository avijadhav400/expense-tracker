import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import { postLogin, postSignup } from "./controllers/User.js";
import { getTransactions, postTransaction, deleteTransaction } from "./controllers/Transaction.js";
import getHealth from "./controllers/Health.js";

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


app.get('/health', getHealth)
app.post("/signup", postSignup);

app.post("/login", postLogin)

app.post("/transaction", postTransaction) 

app.get("/transactions", getTransactions)

app.delete('/transaction/:id', deleteTransaction)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
