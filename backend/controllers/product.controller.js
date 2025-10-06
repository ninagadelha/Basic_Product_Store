import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch (error){
        console.log("Error in fetching prodcuts:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) =>{                                                       //user visits http://localhost:5000/api/products                async??
    const product = req.body;                                                                   //user will send this data    

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);                                                //if passes check (above) new product will be created ('product' = req.body, 'Product' = product.model.js
    
    try{
        await newProduct.save();                                                             //saves new product to database
        res.status(201).json({success: true, data: newProduct});
    }
    catch (error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) =>{
    const {id} = req.params;                                                                //product id

    const product = req.body;                                                               //item fields (name, price, img)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Product ID"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});

        if(!updatedProduct){
        return res.status(404).json({success: false, message: "Product not found"});        //return so we don't execute rest of function
    }

        res.status(200).json({success: true, data: updatedProduct});
    }
    catch{
        res.status(500).json({success: false, message:"Server Error"});
    }
}

export const deleteProduct = async (req, res) =>{                                                  //need to obtain product id so we ensure we delete the correct product
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid product ID"});       //return so we don't execute rest of function
    }
    
    try{
        const product = await Product.findByIdAndDelete(id);

    if(!product){
        return res.status(404).json({success: false, message: "Product not found"});        //return so we don't execute rest of function
    }

        res.status(200).json({success: true, message: "Product deleted"});
    }
    catch (error){
        res.status(500).json({success: false, message: "Server Error"});                    //although success = fail, last line of code
    }                                                                                           //so return not needed
}