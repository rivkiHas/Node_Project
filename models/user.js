 import Joi from "joi";
import  Jwt  from "jsonwebtoken"

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // _id:mongoose.Types.ObjectId,
    email: { type: String, unique:true},
    userName: String,
    passWord: String,
    role: {type: String, default:"USER"},
    dateOfRegistration: {type: Date, default:Date.now()}
})


export const UserModel = mongoose.model("users", userSchema);


//token

export const generateToken = (_id, role, userName) => {
    let token = Jwt.sign({ _id, userName, role },
        process.env.SECRET_JWT, { expiresIn: '90m' }
    ); 
    return token;
}

export const UserValidator = (_user) => {
    const userValidationSchema = Joi.object({
        email: Joi.email(),
        userName: Joi.string().min(2).max(10).required(),
        passWord: Joi.string().required().min(5).max(10),
       role:Joi.string().default("USER"),
        dateOfRegistration: Joi.date()

    })
    return userValidationSchema.validate(_user);
}