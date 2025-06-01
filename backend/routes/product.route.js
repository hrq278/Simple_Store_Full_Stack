import express from "express";
import { addProduct, deleteProduct, getallProduct, updateProduct } from "../controllers/product.controller.js";


const router = express.Router()


router.post("/",addProduct )
router.patch("/:id",updateProduct )
router.get("/:id",deleteProduct )
router.get("/",getallProduct )

export default router;