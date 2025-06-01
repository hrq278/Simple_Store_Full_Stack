import mongoose from "mongoose";



export const connectionInstance = async()=>{
    try {
     await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB is successfully Connected......!!! ")

} catch (error) {
    console.log("connection error", error)
    
}
}
