import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/FACULTY"; // Single string with DB

async function connectToMongo() {
    if (mongoose.connections[0].readyState) {
        // Already connected
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}

export default connectToMongo;
