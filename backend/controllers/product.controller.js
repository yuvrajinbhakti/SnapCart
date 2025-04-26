import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res)=>{
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
    };


export const createProduct = async(req,res)=>{
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
    
    };

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    }
    catch(error){
        console.log("Error in Delete Product: ",error.message);
        res.status(500).json({success:false,message:`Server error,Product not found because: ${error.message}`});
    }
    };

export const updateProduct = async(req,res)=>{
    const {id}=req.params;
    const product = req.body;
    if(!product){
        return res.status(400).json({success:false,message:"Product not found"});
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});
    }
    try{
        await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:product});
    }
    catch(error){
        console.log("Error in Update Product: ",error.message);
        res.status(500 ).json({success:false,message:`Product not updated because: ${error.message}`})
    }
};