import express from 'express';                                      //express helps create websever in Node.js
import dotenv from 'dotenv';                                        //loads enviornmental variables from .env file
import { connectDB } from './config/db.js';                         //imports my database connection function from db.js

dotenv.config();

const app = express();                                              //creates an express application instance

/* app.get("/", (req, res) => {                                     //EXAMPLE: when host is running, we can vist url on browser 
    res.send("Server is ready");                                        //user request access, server responce is "Server is ready"
}); */

app.get("/products", (req, res) =>{

});


app.listen(5000, () => {   
    connectDB();                                                    
    console.log("Server started at http://localhost:5000");         //starts sever and tells it to listen for incoming requests on port 5000
});

