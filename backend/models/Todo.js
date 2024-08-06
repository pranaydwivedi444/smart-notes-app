const mongoose = require("mongoose");


//Defining todo schemes
const TodosSchema = new mongoose.Schema({
  title: String,
  tasks: [
    {
      task: String,
      completed: {
        default: false,
        type: Boolean,
      },
      Priority: Number,
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username : {
    type:String,
    required:true,
    ref: 'User'
  }
});


module.exports = mongoose.model('Todos', TodosSchema);