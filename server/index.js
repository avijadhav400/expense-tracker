import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

//Connect to db
const connectDb = async()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if(conn){
        console.log("Db connected 🚀");
    }
    else{
        console.log("Db not connected ❌");
    }
};
connectDb()

const PORT = process.env.PORT || 5000

app.get('/', (req, res)=>{
    res.json({
        message: `Welcome to expense tracker`
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is runnig on ${PORT}`);
})