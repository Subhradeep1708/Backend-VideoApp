import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

//Yeh verify karega user hai yah nehi hai
export const verifyJWT = asyncHandler(async (req, _, next) => {

    try {
        //getting token
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")// in mobile app header is sent and token is written as "Bearer <Token>" so here  "Bearer " is changed to =>"", so we get the token only

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // verifying the token 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            // TODO: discuss about frontend 
            throw new ApiError(401, "Invalid Access Token")
        }

        //req. => isse jo object banke send hota hai usme ek new object user add karenge
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}) 