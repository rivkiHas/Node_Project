import express from "express";
import { addShoes,deleteShoes,getAllShoes,getShoesById,updateShoes } from "../controllers/shoes.js"
import { auth, authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllShoes);

router.get("/:shoesId", getShoesById);

router.delete("/:shoesId",authAdmin, deleteShoes);

router.post("/" ,authAdmin,addShoes);

router.put("/:shoesId",authAdmin,updateShoes);
 

export default router;