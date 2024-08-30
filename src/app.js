import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.use(cors({ // cors used to talk to only given frontend
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


//(Data aa rha hai uski taiyaari chal rhi hai) when data comes in the form of JSON 
app.use(express.json({ limit: "16kb" })) // max size of json defined so not crash


//jaab url se data ja raha hai thoda issue hota hai koi + koi %20(URL Encoder)

//when data comes from URL
app.use(express.urlencoded({ //url ka encoded data ko handle karne ke liye
    extended: true,
    limit: "16kb"
}))


//somethings are stored in server 
app.use(express.static("public")) //koi bhi store karna ho to public me stored
//server se user browser ke cookies ko access(CRUD operation-) karne ke liye
app.use(cookieParser())





//routes import

import userRouter from './routes/user.routes.js'


//routes declaration

// app.get() nahi likh sakte as router middleware ki tarah dusre file me defined hai so middleware ki tarah treat krna hoga app.use()

app.use("/api/v1/users", userRouter)
//url=> https://localhost:8000/api/v1/users now it will go to user.routes 
export { app }