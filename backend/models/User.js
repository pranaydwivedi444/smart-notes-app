const mongoose = require('mongoose');
//Mongodb.connect



//defining schemas
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }      
})

//creating models
const User =  mongoose.model('User' , UserSchema);
module.exports = User;