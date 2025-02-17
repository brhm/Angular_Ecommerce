const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {v4: uuidv4}=require("uuid");
const fs=require("fs");

// Add Product
router.post("/add",async(req,res)=>{
    try {
        const {name,stock,price,categories}=req.body;

        const productId=uuidv4();
        let product=new Product({
            _id:productId,
            name:name.toUppperCase(),
            stock:stock,
            price:price,
            categories:categories,
            isActive:true,
            createdDate:new Date()
        });

        await product.save();

        res.json({message:"Product has been added succesfully"});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})