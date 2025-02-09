console.log("Merhaba ibrahim");
const express= require("express");
const app = express();
const cors=require("cors");
const connection = require("./database/db");

app.use(express.json());
app.use(cors());

const authRouter=require("./routers/auth.router");
const categoryRouter=require("./routers/category.router");


app.use("/api/auth",authRouter);
app.use("/api/category",categoryRouter);

connection();


app.get("",(req,res)=>{
    res.json({message:"Api request works successfully"})
})

const port=process.env.port || 5000;
app.listen(port,()=> console.log("Application run on this http://localhost:5000 link."));
