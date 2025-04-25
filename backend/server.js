import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
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

app.delete("/api/products/:id",async(req,res)=>{
const {id} = req.params;
try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"Product deleted"});
}
catch(error){
    console.log("Error in Delete Product: ",error.message);
    res.status(500).json({success:false,message:`Product not found because: ${error.message}`});
}
});

app.get("/api/products",async(req,res)=>{
try{

    // await Product.find({}).then((products)=>{
    // res.status(200).json({success:true,data:products});
    // });

    //method 2
    const products = await Product.find({});        //{} means fetch all things/products
    res.status(200).json({success:true,data:products});
}
catch(error){
    console.log("Error in Get Products: ",error.message);
    res.status(500).json({success:false,message:`Server error: ${error.message}`});
}
});

//update api
app.put("/api/products/:id",async(req,res)=>{
    const {id}=req.params;
    const product = req.body;
    if(!product){
        return res.status(400).json({success:false,message:"Product not found"});
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid product id"});
    }
    try{
        await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:product});
    }
    catch(error){
        console.log("Error in Update Product: ",error.message);
        res.status(500 ).json({success:false,message:`Product not updated because: ${error.message}`})
    }
})

app.listen(5000,()=>{
    connectDB();
    console.log("Server is running on port 5000");
});