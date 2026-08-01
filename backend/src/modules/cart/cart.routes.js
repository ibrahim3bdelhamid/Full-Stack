import express from "express"
import { getCart, addToCart, updateCartItem, deleteProductInCart } from "./cart.controller.js"
import { verifyToken }  from "../../middleware/verifyToken.js"

export const cartRoutes = express.Router()

cartRoutes.use(express.json())
cartRoutes.get("/cart", verifyToken, getCart)
cartRoutes.post("/cart", verifyToken, addToCart)
cartRoutes.put("/cart/:productId", verifyToken, updateCartItem)
cartRoutes.delete("/cart/:productId", verifyToken, deleteProductInCart)
