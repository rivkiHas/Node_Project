// import { date } from "joi";
import Joi from "joi";
import mongoose from "mongoose"

const minimalShoesSchema = mongoose.Schema({
    name: String,
    description: String,
    size: Number,
    price: Number,
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    arrivalDate: { type: Date, default: Date.now() + 14 },
    destinationAddress: String,
    userId: String,
    Shoes: [minimalShoesSchema],
    theOrderHasStarted: { type: Boolean, default: false }

})

export const OrderModel = mongoose.model("orders", orderSchema);


export const OrderValidator = (_order) => {
    const OrderValidationSchema = Joi.object({
        orderDate: Joi.date(),
        arrivalDate: Joi.date(),
        destinationAddress: Joi.string().required(),
        userId: Joi.string(),
        Shoes: Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            size: Joi.number().min(35).max(45),
            price: Joi.number().min(100).max(1000)
        }),
        theOrderHasStarted: Joi.boolean().default(false)

    })
    return OrderValidationSchema.validate(_order);
}