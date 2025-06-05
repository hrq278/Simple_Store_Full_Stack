import express from "express";
import dotenv from "dotenv";
import { connectionInstance } from "./db/connection.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors"
import path from "path";



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

const __dirname = path.resolve();


app.use(express.json()) //parsing JSON data


app.use("/api/products",productRoutes) //Routes


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

connectionInstance()

.then(()=>{
    const port = process.env.PORT || 5000  
       app.listen(port, ()=>{
        console.log("app is listening to localhost: " + port)
       })
    })
.catch((error)=>{
    console.log("Mongo DB connection Failed", error)
})





