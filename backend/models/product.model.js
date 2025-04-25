import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
},{
    timestamps:true //createdAt and updatedAt
});

const Product = mongoose.model("Product",productSchema);    //it will be named as products collection in our database
export default Product;