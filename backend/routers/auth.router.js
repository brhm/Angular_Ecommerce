const User = require("../models/user");
const express= require("express");
const router = express.Router();
const {v4:uuidv4}= require("uuid");
const jwt=require("jsonwebtoken");

const secretKey="My secret key 123456";
const options= {
    expiresIn:"1d"
}

router.post("/register", async(req,res)=>{
    try{
        const user =new User(req.body);
        user._id=uuidv4();
        user.createdDate=new Date();
        user.isAdmin=false;

        const checkUserEmail =await User.findOne({email:user.email});
        if(checkUserEmail!=null)
        {
            res.status(403).json({message:"This email has been used before."})
        }else{

        await user.save();
        const token=jwt.sign({},secretKey,options);

        let model= {token:token, user:user};
        res.json(model);
        }

    }catch(error){
        res.status(500).json({message:error.message});

    }
})

module.exports=router;