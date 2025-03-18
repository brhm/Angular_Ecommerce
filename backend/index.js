console.log("hello ibrahim");
const express= require("express");
const app = express();
const cors=require("cors");
const connection = require("./database/db");
const path= require("path");

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const authRouter=require("./routers/auth.router");
const categoryRouter=require("./routers/category.router");
const productRouter=require("./routers/product.router");
const basketRouter=require("./routers/basket.router");


app.use("/api/auth",authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/products",productRouter);
app.use("/api/baskets",basketRouter);

connection();


app.get("",(req,res)=>{
    res.json({message:"Api request works successfully"})
})

const port=process.env.port || 5000;
app.listen(port,()=> console.log("Application run on this http://localhost:5000 link."));
