import express from 'express';                                      //express helps create websever in Node.js
import dotenv from 'dotenv';                                        //loads enviornmental variables from .env file
import { connectDB } from './config/db.js';                         //imports my database connection function from db.js

import productRoutes from "./routes/product.route.js";

dotenv.config();                                                    //loads enviornmental variables from .env file

const app = express();                                              //creates an express application instance

app.use(express.json());                                            //allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(5000, () => {   
    connectDB();                                                    //connects MongoDB after server starts                                         
    console.log("Server started at http://localhost:5000");         //starts sever and tells it to listen for incoming requests on port 5000
});

