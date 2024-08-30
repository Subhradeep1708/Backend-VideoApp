import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // DB ke koi bhi field ko searchable banane ke liye usme index add kardo(This optimises searching)
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary pe image upload karke uska url lenge
            required: true,
        },
        coverImage: {
            type: String, // cloudinary pe image upload karke uska url lenge
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String,
        }

    }, { timestamps: true })



//do not use arrow func as they dont have this context

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next() //agar password field change hoga tabhi data save hoga(Pre hook har bar data change hone me chalta hai)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// user jab password likhega toh kaise check kare(custom method)

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password) //return true or false
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id, //_id is stored by mongoDB
            email: this.email,
            username: this.username,
            fulllName: this.fulllName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id, //_id is stored by mongoDB
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.Model("User", userSchema)