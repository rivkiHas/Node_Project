import mongoose, { Mongoose } from "mongoose";
import { ShoesModel, ShoesValidator } from "../models/shoes.js"



export const getAllShoes = async (req, res) => {
   
    try {
        let allShoes = await ShoesModel.find({})
        res.json(allShoes);
    }
    catch (err) {
        console.log(err);
        res.status(409);
        throw new Error("sorry cannot get shoes")
    }

}


export const getShoesById = async (req, res) => {
    let { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
    
        }
        let shoes = await ShoesModel.findById(id);
        if (!shoes) {
            res.status(404);
            throw new Error(' no shoes by such id ')
           
        }
        return res.json(shoes);
    }
    catch (err) {
        console.log(err);
        res.status(404);
        throw new Error("sorry cannot get shoes")
        
    }

}


export const deleteShoes = async (req, res) => {
    let { _id } = req.params;

    try {
        if (!mongoose.isValidObjectId(_id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        let shoes = await ShoesModel.findByIdAndDelete(_id);
        if (!shoes) {
            res.status(404);
            throw new Error('no shoes with such id to delete')
        }
        return res.json(shoes);
    }
    catch (err) {
        console.log(err);
        res.status(409);
        throw new Error("sorry cannot get shoes")

    }

}

export const addShoes = async (req, res) => {
    let { name, description, size, manufacturingDate, price ,image} = req.body;
    const resualt = await ShoesValidator(req.body);
    console.log(resualt)
    if (resualt.errors) {
        {
            res.status(404);
            throw new Error(resualt.errors.details[0].message)
        }
    }
    try {
        let sameShoes = await ShoesModel.find({ name: name, size: size });
        if (sameShoes) {
            res.status(409);
            throw new Error("there is already same course")
        }

        let newShoes = await ShoesModel.create({ name, description, size, manufacturingDate, price,image })
        await newShoes.save();
        return res.json(newShoes);
    }
    catch (err) {
        console.log(err);
        res.status(409);
        throw new Error("sorry cannot get shoes")
    }

}

export const updateShoes = async (req, res) => {
    let id = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('קוד לא הגיוני')
    }
    try {
        let shoes = await ShoesModel.findById(id);
        if (!shoes) {
            res.status(400);
            throw new Error(" no shoes with this id ")
        }
        let updeteShoesById = await ShoesModel.findByIdAndUpdate(id, req.body, { new: true })
        await shoes.save();
        return res.json(updeteShoesById);
    }
    catch (err) {
        console.log(err);
        res.status(409);
        throw new Error("sorry cannot get shoes")

    }

}