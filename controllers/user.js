import mongoose, { Mongoose } from "mongoose";
import { UserModel, generateToken } from "../models/user.js"
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res) => {
    try { 
        let allUser = await UserModel.find({},"-password");
        res.json(allUser);
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get users" });

    }

}


export const getUserById = async (req, res) => {
    let { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: " id not in the format" });
        let user = await UserModel.findById(id);
        if (!user)
            return res.status(404).json({ type: "invalid id", message: "no order with such id" });
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get eser" });

    }

}



export const addUser = async (req, res) => {
    let { email, userName, password} = req.body;
    req.user;
    if (!email || !password || !userName)
        return res.status(409).json({ type: "missing params", message: "you missing mail, user name or password" })
    try {
        let sameuser = await UserModel.findOne({ email: email })
        if (sameuser)
            return res.status(409).json({ type: " same user", message: "we have same user in this db" });
        let hashedPassword=await bcrypt.hash(password,15)
            let newUser = new UserModel({ email, userName, password:hashedPassword, role:"USER", dateOfRegistration :Date.now()})
        await newUser.save();
        let token = generateToken(newUser.email, newUser.role, newUser.userName)
        return res.json({ _id: newUser._id, userName: newUser.userName, token, email:newUser.email })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get user" });

    } 

}
 

export const updateUser = async (req, res) => {
    let id = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: " id not in the format" });
    try {
        let user = await UserModel.findById(id);
        if (!user)
            return res.status(404).json({ type: "user not found", message: " no user with this id " })
        let updeteusersById = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
        await user.save();
        return res.json(updeteusersById);

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get user" });

    }

}

export const login = async (req, res) => {

    let { email, password } = req.body;
    if (!email || !password)
        return res.status(404).json({ type: "missing params  ", message: " missing email or password" });
    try {
        let user = await UserModel.findOne({ email});
        if (!user)
            return res.status(404).json({ type: " no user  ", message: "one or more detail are not valid" });
        let userPassword=bcrypt.compare(password,user.password)
        if (! userPassword)
            return res.status(404).json({ type: "no user  ", message: " user password is invalid" });

        let token = generateToken(user._id, user.role, user.userName)
        return res.json({ _id: user._id, userName: user.userName, token, email:user.email })
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot sign in user" });
    } 
}