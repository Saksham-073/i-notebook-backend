const mongoose = require('mongoose')

const mongURI = process.env.DB_URL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongURI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message)
        process.exit(1)
    }
}

module.exports = connectToMongo;
