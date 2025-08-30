import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv';
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

dotenv.config();
// app config
const app = express()
const port =  process.env.PORT ||4000;

// middleware
app.use(express.json());
app.use(cors());




//db connection
connectDB();

///api endpointds
app.use("/api/food",foodRouter);
app.use('/uploads', express.static('uploads')); 
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
  res.send("API WORKING")
})
app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
})

//