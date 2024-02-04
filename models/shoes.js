

import Joi from "joi";
import mongoose from "mongoose";

const shoesSchema = mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    description: String,
    size: { type: Number, require: true },
    manufacturingDate: { type: Date, default: new Date() },
    price: Number,
    image: {type:String,default:"280158_1411-1685979782544737.jpg"}
});


export const ShoesModel = mongoose.model("shoes", shoesSchema);


export const ShoesValidator = (_shoes) => {
    const ShoesValidationSchema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(5),
        size: Joi.number().min(35).max(45).required(),
        manufacturingDate: Joi.date(),
        price: Joi.number().min(100).max(1000).required(),
        image: Joi.string().default("280158_1411-1685979782544737.jpg")

    })
    return ShoesValidationSchema.validate(_shoes);
}
