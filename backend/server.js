import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

// Debug environment mode
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// Enable CORS with more explicit configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://snap-cart-kap9.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const __dirname = path.resolve();
app.use(express.json());  //middleware(function which runs before we send response back to client) to parse request body (allows to accpt JSON data in req.body)

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/products", productRoutes);     // /api/products will be appended to all api i.e. prefixed with /api/products

if(process.env.NODE_ENV === "production"){
    console.log("Entering production mode block");
    app.use(express.static(path.join(__dirname,"/frontend/dist"))); //making frontend/dist(which we got on running npm run build in frontend) folder static so that it can be served as static files
    
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on http://localhost:"+PORT);
});