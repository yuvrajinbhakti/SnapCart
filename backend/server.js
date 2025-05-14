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
console.log(`VERCEL_ENV: ${process.env.VERCEL_ENV}`);

// Enable CORS with more explicit configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://snap-cart-4gh8.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const __dirname = path.resolve();
app.use(express.json());  //middleware to parse request body

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Handle API routes
app.use("/api/products", productRoutes);
app.use("/api/health", healthRoutes);

// API route that confirms the API is running
app.get("/api/health", (req, res) => {
    res.status(200).send({ status: "ok", message: "API is running" });
});

// Connect to database as soon as possible
try {
    connectDB();
} catch (error) {
    console.error("Failed to connect to database:", error);
}

// For production mode with frontend in dist folder
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// For local development, we'll need the server to listen on a port
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
    });
}

// For Vercel serverless functions
export default app;