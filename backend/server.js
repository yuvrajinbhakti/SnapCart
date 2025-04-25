import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
dotenv.config();

const app=express();

app.use(express.json());  //middleware(function which runs before we send response back to client) to parse request body (allows to accpt JSON data in req.body)

app.post("/api/products",async(req,res)=>{
    const product = req.body;   //user will send this data
    if(!product.name || !product.image || !product.price){
        return res.status(400).json({success:false,message:"Please provide all fields."});
    }
    const newProduct = new Product(product);
    try{
            await newProduct.save();
            res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.log("Error in Create Product: ",error.message);
        res.status(500).json({success:false,message:error.message});
    }

})


app.listen(5000,()=>{
    connectDB();
    console.log("Server is running on port 5000");
});