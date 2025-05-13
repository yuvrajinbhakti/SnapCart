import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        // Check for multiple possible environment variable names for flexibility
        const mongoUri = process.env.MONGO_URI || 
                         process.env.VITE_REACT_APP_MONGO_URI || 
                         process.env.MONGODB_URI;
        
        if (!mongoUri) {
            console.error("MongoDB URI not found in environment variables. Please set MONGO_URI.");
            process.exit(1);
        }
        
        const conn = await mongoose.connect(mongoUri, {
            // These options are no longer needed in newer Mongoose versions but kept for compatibility
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);    //process code 1 means exit with failure, 0 means success
    }
}