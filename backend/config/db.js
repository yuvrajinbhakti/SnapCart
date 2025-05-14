import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        // Check for multiple possible environment variable names for flexibility
        const mongoUri = process.env.MONGO_URI || 
                         process.env.VITE_REACT_APP_MONGO_URI || 
                         process.env.MONGODB_URI;
        
        if (!mongoUri) {
            console.error("MongoDB URI not found in environment variables. Please set MONGO_URI in your Vercel project settings.");
            // Don't exit process in serverless environment
            if (!process.env.VERCEL) {
                process.exit(1);
            }
            return;
        }
        
        const conn = await mongoose.connect(mongoUri, {
            // These options are no longer needed in newer Mongoose versions but kept for compatibility
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    }
    catch(error){
        console.error(`MongoDB connection error: ${error.message}`);
        // Don't exit process in serverless environment
        if (!process.env.VERCEL) {
            process.exit(1);
        }
        return null;
    }
}