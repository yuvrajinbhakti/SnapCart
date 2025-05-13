import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import healthRoutes from "./routes/health.route.js";
dotenv.config();

const app = express();
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

// Handle API routes
app.use("/api/products", productRoutes);     // /api/products will be appended to all api i.e. prefixed with /api/products
app.use("/api/health", healthRoutes);        // Health check endpoint

// For Vercel deployment serverless function support
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    console.log("Running in production mode");
    
    // API route that confirms the API is running
    app.get("/api/health", (req, res) => {
        res.status(200).send({ status: "ok", message: "API is running" });
    });
    
    // For local production testing with frontend in dist folder
    if (!process.env.VERCEL) {
        app.use(express.static(path.join(__dirname, "/frontend/dist")));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
        });
    }
}

// For local development, we'll need the server to listen on a port
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        connectDB();
        console.log("Server is running on http://localhost:" + PORT);
    });
} else {
    // In Vercel environment, just connect to DB
    connectDB();
}

// For Vercel serverless functions
export default app;