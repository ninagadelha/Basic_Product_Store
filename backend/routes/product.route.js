import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

//method to get all prodcuts
router.get("/", getProducts);

//method to post (create) a product
router.post("/", createProduct);

//method to put (update) a product
router.put("/:id", updateProduct);

//method to delete a product
router.delete("/:id", deleteProduct);

export default router;