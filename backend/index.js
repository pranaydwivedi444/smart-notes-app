const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes')
const app = express();

app.use(express.json());

// connecting to database
connectDB();

//routes 
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.all('*', (req, res) =>{
    res.status(404).json({message: 'Page not found'});  // 404 error handling middleware
});

//error handling middleware
app.use((err, req, res) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Error while connecting';
    res.status(err.statusCode).json({message: err.message});

    //seperate for production use and development use
})
app.listen(process.env.PORT,()=>{
    console.log('running on port '+process.env.PORT);
})