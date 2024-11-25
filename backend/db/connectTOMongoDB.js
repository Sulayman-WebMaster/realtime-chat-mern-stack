import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        
        console.log("connected to MongoDB")


    }catch(error){
        console.log(error.message)
    }
}
export default connectDB;