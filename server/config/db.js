const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
    }
}

module.exports = connectToMongoDB


