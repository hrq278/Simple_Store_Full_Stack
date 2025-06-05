import express from "express";
import dotenv from "dotenv";
import { connectionInstance } from "./db/connection.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors"

dotenv.config(
    {
        path: "./backend/.env"
    }
)

const app = express()

app.use(cors({
  origin: "*", // Allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],

}));
app.use(express.json()) //parsing JSON data

app.use("/api/products",productRoutes) //Routes


connectionInstance()

.then(()=>{
    const port = process.env.PORT || 5000  
       app.listen(port, ()=>{
        console.log("app is listening to " + port)
       })
    })
.catch((error)=>{
    console.log("Mongo DB connection Failed", error)
})





