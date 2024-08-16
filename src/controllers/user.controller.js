import { asyncHandler } from "../utils/asyncHandler.js";



const registerUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message:"Ok hai"
    })
})

// const registerUser = asyncHandler(async (req, res) => {
//     // STEPS
//     // get user data from frontend
//     // validate - the data is empty or not
//     // check if user already exists: email, username
//     // check for image,check for avatar
//     // upload them on cloudinary,check if avatar uploaded in cloudinary 
//     // create user object - create entry in db
//     // remove password and refresh token from response(mongodb res me sab aata hai)
//     // check if user is created or not
//     // return response

    
// })

export { registerUser }