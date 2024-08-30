import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// lec-12
// const registerUser = asyncHandler(async (req, res) => {

//     res.status(200).json({
//         message:"Ok hai"
//     })
// })

const registerUser = asyncHandler(async (req, res) => {
    // STEPS TO REGISTER A USER (Algorithm)
    //1. get user details from frontend
    //2. validation - the data is empty or not
    //3. check if user already exists:check by email, username(these two are unique)
    //4. check for images,check for avatar
    //5. upload them on cloudinary,check if avatar uploaded in cloudinary 
    //6. create user object - create entry in db
    //7. remove password and refresh token field from response(mongodb res me sab aata hai)
    //8. check if user is created or not
    //9.  return response

    // step 1: frontend se req.body me data aata hai(url se bhi aa sakta hai)
    const { fullName, username, email, password } = req.body
    console.log("email:", email);

    // step 2: validation 

    // if (fullName === "") {
    // throw new ApiError(400,"fullname is required")
    // }

    // All at once check(Advanced)
    if (
        [fullName, username, email, password].some((field) =>
            field?.trim() === "") // agar field present hi toh trim karo agar firbhi empty hai toh return true hoga   
    ) {
        throw new ApiError(400, "All fields are required")
    }


    // step 3: user exist or not check
    const existedUser = User.findOne({
        $or: [{ username }, { email }] //or se ekse jyada find kar skte hai nehito only ek hi find ke field leta hai findOne
    })

    console.log("existedUser : ", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with email and username already exists")
    }

    // step 4: check for images & avatar

    // middleware jo add kiya hai user.route me woh req.body ke andar aur fields dal deta hai (.files deta hai multer)

    //files ke first property ke andar ek object milta hai jo multer ke upload kiya hua file path hai
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //avatar is compulsory
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }


    // Step 5: upload on cloudinary & check if avatar uploaded in cloudinary

    //upload hone me time lagega soo await lagana hoga async handler use karne ke baad bhi
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) { //avatar is a must required field
        throw new ApiError(400, "Avatar file is required");
    }


    //Step 6: create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,//db me url store karenge jo cloudinary send karega
        coverImage: coverImage?.url || "",//coverImg nai hai toh empty rakho
        email,
        password,
        username: username.toLowerCase()
    })


    //Step 7:remove password and refresh token field from response(mongodb res me sab aata hai)

    //weird syntax kya kya nehi select karna hai woh string me likhna hai (by default all selected)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    //Step 8: check if user is created or not
    //user bana hai ya nehi bana check karo
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    //Step 9: return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")//ApiResponse class ka object bana ke return kr rhe hai
    )
})

export { registerUser } 