// THIS IS CLEAN CODE WRITING DB CONNECION CODE SEPARATELY
// require('dotenv').config({path:'./env'})  // code consistency kharap

//dotenv .env file ke content ko sab jagah available kara deta hai
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({ //configuring dotenv path 
    path: './.env'
})

// connectDB method is async this will return a promise(Usko handle krna padega)
connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is running at Port: ${process.env.PORT}`);
            
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection Failed!!!", err);

    })






//  METHOD-1:THIS IS THE SIMPLE METHOD AND THE CODE IS CLUTTERED

// import mongoose from 'mongoose'
// import { DB_NAME } from './constants'
/*
import express from 'express'
const app = express()

    // using IIFE
    ; (async () => {
        try { // database alag continent me hai use try catch
           await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
            app.on("error", (error) => {
                console.error("Err:", error)
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log("APP is listening on port", process.env.PORT);
            })

        } catch (error) {
            console.error("Error:", error)
            throw err
        }
    })()    
        
    */