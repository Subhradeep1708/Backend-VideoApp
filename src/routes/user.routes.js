import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

  
const router = Router()

// registerUser se pehle middleware(upload) run karana hai(avatar upload karne ke liye) 
router.route("/register").post(
    upload.fields([ 
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ])
    ,
    registerUser
)//register url me add hoga


export default router