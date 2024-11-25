import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectDB from './db/connectTOMongoDB.js'
const app = express();

dotenv.config();
app.get('/',(req,res)=>{ 
    res.send("hello")
})
const port = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.listen(port, ()=> {
    connectDB();
    console.log("server is running")})