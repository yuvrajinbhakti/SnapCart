import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  //middleware(function which runs before we send response back to client) to parse request body (allows to accpt JSON data in req.body)

app.use("/api/products",productRoutes);     // /api/products will be appended to all api i.e. prefixed with /api/products

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on http://localhost:"+PORT);
});