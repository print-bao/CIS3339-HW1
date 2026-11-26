const mongoose = require('mongoose');
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB has connected successfully.');
    } catch (error){
        console.error('MongoDB connection has failed:', error.message);
        process.exit(1);
    }
}
module.exports = connectDB;