const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {v4: uuidv4}=require("uuid");
const fs=require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

// Add Product
router.post("/add",upload.array("images"),async(req,res)=>{

    response(res, async ()=>{
        const {name,stock,price,categories}=req.body;

        const productId=uuidv4();
        let product=new Product({
            _id:productId,
            name:name.toUppperCase(),
            stock:stock,
            price:price,
            categories:categories,
            isActive:true,
            imageUrls:req.files,
            createdDate:new Date()
        });

        await product.save();

        res.json({message:"Product has been added succesfully"});

    });
})

// Remove Product

router.post("removeById", async(req,res)=>{
    response(res,async()=>{
        const {_id}=req.body;

        const product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path,()=>{});
        }

        await Product.findByIdAndDelete(_id);
        res.json({message:"Product has been deleted."});
    });

})