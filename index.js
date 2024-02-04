import express from "express";
import orderRouter from "./routes/order.js"
import shoesRouter from "./routes/shoes.js"
import userRouter from "./routes/user.js"
import { connectTodb } from "./db/connectTodb.js";
import { config } from "dotenv";
import  cors  from "cors"
import { errors } from "./middlewares/errors.js";


const app = express();
app.use(cors({ methods: "POST GET PUT DELETE UPDATE", origin: "http://localhost:3000" }))

app.use(express.json());
app.use("/api/orders", orderRouter);
app.use("/api/shoes", shoesRouter);
app.use("/api/users", userRouter);
connectTodb();
config();

app.use(errors)

let port = process.env.PORT || 3800
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
