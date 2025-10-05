import mongoose from "mongoose";

const productSchema = new mongoose.Schema({                         //each product should have the following fields
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true                                                //createdAt, updatedAt
});

const Product = mongoose.model("Product", productSchema);           //tells mongoose to create a collection called 'Product' (with fields defined in productSchema)
export default Product;