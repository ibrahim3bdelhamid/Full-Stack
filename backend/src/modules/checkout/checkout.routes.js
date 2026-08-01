import express from "express"
import { checkout, getMyOrders, getOrderById } from "./checkout.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js"

export const checkoutRoutes = express.Router()

checkoutRoutes.use(express.json())
checkoutRoutes.post("/checkout", verifyToken, checkout)
checkoutRoutes.get("/checkout/my-orders", verifyToken, getMyOrders)
checkoutRoutes.get("/checkout/:id", verifyToken, getOrderById)
