import express from "express";
import { addOrder, deleteOrder, getAllorders, getOrderByUserId ,updateOrder} from "../controllers/order.js"
import {auth, authAdmin}  from "../middlewares/auth.js";

const router = express.Router();

router.get("/",authAdmin ,getAllorders);

router.get("/:orderId",auth, getOrderByUserId);

router.delete("/:orderId",auth, deleteOrder);

router.post("/" ,auth,addOrder);

router.put("/:orderId", updateOrder);

export default router;