import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from "cors";
dotenv.config();

// const express = require("express");
const app = express();

const uri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/GRID";
mongoose.connect(uri)
        .then(() => console.log("DB Connected"))
        .catch((err) => console.log("DB Connection Error", err));

// middlewares
app.use(cors(
    {
        origin: ["http://localhost:3000" , "https://flairshop.onrender.com"]
    }
));
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json

// Example of middleware
// app.use((req, res, next)=>{
//     console.log("Middleware executed");
//     next();
// });


// app.get("/api/users", function(req, res){
//     res.json({
//         data: "Adarsh is back with web development course on MERN stack", 
//     });
// });

// router middleware
app.use("/api", authRoutes);    
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port=process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});

// In writing a function, instead of writing function() we can write () => { } as well.

// app.listen(8000, () => {
//     console.log("Server is running on port 8000");
// });  

// .env file and .gitignore file