const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Use process.env.MONGO_URI or fallback to a hardcoded URI for testing (ensure not to use hardcoded in production)
const dbURI = process.env.MONGO_URI || 'mongodb+srv://ashi4:CLJb6up0GbwrCYQO@cluster0.rwgxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    // Connecting to MongoDB with a timeout for safety
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional timeout setting
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message); // Include specific error message
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
