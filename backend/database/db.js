const mongoose = require("mongoose");

const uri="mongodb://localhost:27017/?retryWrites=true&w=majority";

const connection=()=>{
    mongoose.connect(uri,{
        
    })
    .then(()=>console.log("MongoDB'S connection is success"))
    .catch((err)=>{console.log("MongoDB connection is error: "+err.mesaage)});
}
module.exports=connection;