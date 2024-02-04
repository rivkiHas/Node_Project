
import mongoose, { Mongoose } from "mongoose";
import { OrderModel } from "../models/order.js"



export const getAllorders = async (req, res) => {
    try {
        let allOrders = await OrderModel.find({});
        res.json(allOrders);
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get orders" });

    }

}


export const getOrderByUserId = async (req, res) => {
    let { _id } = req.user;
    if (!_id)
        return res.status(400).json({ type: "not valid user id", message: " id not in format" });

    try {
 
        let order = await OrderModel.find({ userId: _id });
        if (!order)
            return res.status(404).json({ type: "invalid id", message: "no order with such id" });
        return res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" });

    }

}


export const deleteOrder = async (req, res) => {
    let { id } = req.params;

    try {
        if (!mongoose.isValidobjectid(id))
            return res.status(400).json({ type: "not valid id", message: " id not in the format" });
        let order = await OrderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "no order to delete", message: "no order with such id to delete" });

        if (req.user.role != "ADMIN" && order.userId != req.user._id)
            res.status(403).json({ type: "not alowed", message: "you are not alowed to deleted order only menegere or if you orderd this order" })
        order = OrderModel.findByIdAndDelete(id)
        return res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" });

    }

}


export const addOrder = async (req, res) => {
    let { orderDate, arrivalDate, destinationAddress, theOrderHasStarted, codeUser } = req.body;
    if (!codeUser || !destinationAddress)
        return res.status(409).json({ type: "same order", message: "cannot save order already same order" })
    try {
        let sameOrder = await OrderModel.find({ codeUser: codeUser, orderDate: orderDate })
        if (sameOrder)
            return res.status(404).json({ type: "no order to delete", message: "no order with such id to delete" });
        let newOrder = new OrderModel({ orderDate, arrivalDate, destinationAddress, theOrderHasStarted, codeUser, userId: req.user._id })
        await newOrder.save();
        return res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "is not valid id ", message: "id is not in right format" });

    }

}

export const updateOrder = async (req, res) => {
    let id = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: " id not in the format" });
    try {
        let order = await OrderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "order not found", message: " no order with this id " })
        order.theOrderHasStarted = true
        await order.save();
        return res.json(updeteOrderById);

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" });

    }

}

 