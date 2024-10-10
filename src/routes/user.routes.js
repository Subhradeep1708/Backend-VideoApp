import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


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

router.route("/login").post(loginUser)

// secured routes 
router.route("/logout").post(verifyJWT, logoutUser)


export default router