import mongoose from 'mongoose';

export const connectDB = async() =>{
    try{                                                                //NOTE: using enviornmental variables ('process.env.MONGO_URI') allows us to keep sensitive info out of code 
        const conn = await mongoose.connect(process.env.MONGO_URI);     //conect to my MongoDB database
        console.log(`MongoDB Connected: ${conn.connection.host}`);      
    }                                                                   //NOTE: FN + Esc for backtick
    catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1);                                                //process code 1 = failure, 0 = success
    }
}