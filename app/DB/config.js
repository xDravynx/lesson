const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`Connected to MongoDB successfully: ${conn.connection.host}`);
    } catch (error)
     {
        console.error('MongoDB connection error:', error);
        throw error;
    }    
}

module.exports = connectDB;