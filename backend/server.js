import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectDB from './db/connectTOMongoDB.js'

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json())
app.use("/api/auth",authRoutes);
app.get('/',(req,res)=>{ 
    res.send("hello")
})

// Define a POST route
app.post('/submit', (req, res) => {
    // Access the request body
    const { name, email } = req.body;

    // Simple response
    res.status(200).json({
        message: 'Data received successfully',
        data: {
            name: name,
            email: email
        }
    });
});



app.listen(port, ()=> {
    connectDB();
    console.log("server is running")})