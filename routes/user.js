import express from "express";
import { getAllUsers,getUserById,addUser,updateUser,login} from "../controllers/user.js"
import { authAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.get("/", authAdmin,getAllUsers);

router.get("/:userId",authAdmin ,getUserById);

router.post("/", addUser);

// router.put("/:userId",updateUser);  

router.post("/login",login);

export default router;  