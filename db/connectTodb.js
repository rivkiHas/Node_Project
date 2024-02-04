import mongoose from "mongoose"

export const connectTodb = async () => {
    try {
        let connect = await mongoose.connect(process.env.DB_URI||"mongodb+srv://0548573694r:0KHEEpTTDK9VczyN@projects.hkauijm.mongodb.net/")
        console.log("mongo db conected")
    }
    catch (err) {
        console.log(err)
        console.log("cannot connect to db");
        process.exit(1)
    }

}