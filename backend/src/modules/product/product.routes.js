import express from "express"
import { addProduct, getProducts, updatedProduct, deleteProduct } from "./product.controller.js"
import { verifyToken }  from "../../middleware/verifyToken.js"

export const productRoutes = express.Router()

productRoutes.use(express.json())
productRoutes.post("/products", verifyToken, addProduct)
productRoutes.get("/products", getProducts)
productRoutes.put("/products/:id", verifyToken, updatedProduct)
productRoutes.delete("/products/:id", verifyToken, deleteProduct)
