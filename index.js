import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from 'dotenv'
dotenv.config()

// const express = require("express") ;
// const mongoose=require("mongoose");
// const cors =require("cors");

import { wrouter } from "./routes/workerRoute.js";
import { trouter } from "./routes/transactionRoute.js";



 const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT,console.log("server 🚀 started on port >>>",PORT));



//  const url= process.env.MONGODB_URI || "mongodb://localhost/pennykeeper";
const url="mongodb+srv://SabarishE:sabarishe@cluster0.eeimf.mongodb.net/penny-keeper";

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true}).catch(error => console.log("mongoose error on initial connection >>>",error));

const dbconnection=mongoose.connection;

dbconnection.on("open",()=>console.log("MongoDB in connected"));
dbconnection.on("error",()=>console.log("mongoose error after initial connection"))




app.get("/",(req,res)=>{
    res.send("Test request for penny keeper");
    
      })

    
app.use("/workers",wrouter);
app.use("/transactions",trouter);

export default app;
