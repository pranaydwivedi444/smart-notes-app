
const mongoose = require('mongoose');
// require('dotenv').config({path:'./.env'});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
