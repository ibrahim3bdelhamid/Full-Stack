import { cartModel } from "../../../db/models/cart.model.js"
import { orderModel } from "../../../db/models/order.model.js"

async function checkout(req, res) {
    try {
        let cart = await cartModel.findOne({user:req.decoded._id}).populate("products.product")

        if (!cart || cart.products.length === 0) {
            return res.json({message: "Cart is empty"})
        }

        for (let item of cart.products) {
            if (!item.product) return res.json({message: "A product in your cart no longer exists"})
            if (item.product.stock < item.amount) {
                return res.json({message: `Not enough stock for ${item.product.name}`})
            }
        }

        let orderItems = cart.products.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            amount: item.amount
        }))

        let totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.amount, 0)

        for (let item of cart.products) {
            item.product.stock -= item.amount
            await item.product.save()
        }

        let order = await orderModel.create({
            user: req.decoded._id,
            products: orderItems,
            totalPrice,
            status: "pending"
        })

        cart.products = []
        await cart.save()

        res.json({message: "Order placed successfully", order})
    } catch (err) {
        res.json({message: "Checkout failed", error: err.message})
    }
}

async function getMyOrders(req, res) {
    try {
        let orders = await orderModel.find({user:req.decoded._id}).sort({createdAt:-1})
        res.json({message: "Orders", orders})
    } catch (err) {
        res.json({message: "Failed to get orders", error: err.message})
    }
}

async function getOrderById(req, res) {
    try {
        let order = await orderModel.findOne({_id:req.params.id, user:req.decoded._id})
        if (!order) return res.status(404).json({message: "Order not found"})
        res.json({message: "Order", order})
    } catch (err) {
        res.json({message: "Failed to get order", error: err.message})
    }
}

export {
    checkout,
    getMyOrders,
    getOrderById
}
