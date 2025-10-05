import express from 'express';                                      //express helps create websever in Node.js
import dotenv from 'dotenv';                                        //loads enviornmental variables from .env file
import { connectDB } from './config/db.js';                         //imports my database connection function from db.js
import Product from './models/product.model.js';

dotenv.config();                                                    //loads enviornmental variables from .env file

const app = express();                                              //creates an express application instance

app.use(express.json());                                            //allows us to accept JSON data in the req.body

/* app.get("/", (req, res) => {                                     //EXAMPLE: when host is running, we can vist url on browser 
    res.send("Server is ready");                                        //user request access, server responce is "Server is ready"
}); */

//method to post (create) a product
app.post("/api/products", async (req, res) =>{                      //user visits http://localhost:5000/api/products                async??
    const product = req.body;                                       //user will send this data    

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);                        //if passes check (above) new product will be created ('product' = req.body, 'Product' = product.model.js
    
    try{
        await newProduct.save();                                    //saves new product to database
        res.status(201).json({success: true, data: newProduct});
    }
    catch (error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

//method to delete a product
app.delete("/api/products/:id", async (req, res) =>{                //need to obtain product id so we ensure we delete the correct product
    const {id} = req.params;
    
    try{
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            res.status(404).json({success: false, message: "Product not found"}); 
        }
        res.status(200).json({success: true, message: "Product deleted"});
    }
    catch (error){
        res.status(400).json({success: false, message: "Invalid product ID"}); 
    }
});


app.listen(5000, () => {   
    connectDB();                                                    //connects MongoDB after server starts                                         
    console.log("Server started at http://localhost:5000");         //starts sever and tells it to listen for incoming requests on port 5000
});

