import { cartModel } from "../../../db/models/cart.model.js"
import { productModel } from "../../../db/models/products.model.js"

async function getCart(req,res){
    try{
        let userCart = await cartModel.findOne({user:req.decoded._id}).populate("products.product")
        if(!userCart) return res.json({message: "Cart is empty", cart: {user: req.decoded._id, products: []}})
        res.json({message:"Cart", cart: userCart})
    }catch(err){
        res.json({message: "Failed to get cart", error: err.message})
    }
}

async function addToCart(req, res) {
    try{
        let {productId, amount} = req.body

        let product = await productModel.findById(productId)
        if(!product) return res.json({message: "Product not found"})
        if (product.stock < amount) return res.json({message:"Not enough stock"})

        let cart = await cartModel.findOne({user:req.decoded._id})
        if (!cart) {
            cart = await cartModel.create({user:req.decoded._id, products:[{product: productId, amount}]})
            return res.json({message: "Added to cart", cart})
        }

        let existingItem = cart.products.find(item => item.product.toString() === productId)
        if (existingItem) {
            existingItem.amount += Number(amount)
        } else {
            cart.products.push({product:productId, amount})
        }

        await cart.save()
        res.json({message: "Added to cart", cart})
    }catch(err){
        res.json({message: "Failed to add to cart", error: err.message})
    }
}

async function updateCartItem(req, res) {
    try{
        let {productId} = req.params
        let {amount} = req.body

        if (!amount || Number(amount) <= 0) return res.json({message: "Invalid amount"})

        let product = await productModel.findById(productId)
        if(!product) return res.json({message: "Product not found"})
        if (product.stock < amount) return res.json({message:"Not enough stock"})

        let cart = await cartModel.findOne({user:req.decoded._id})
        if (!cart) return res.json({message: "Cart is empty"})

        let existingItem = cart.products.find(item => item.product.toString() === productId)
        if (!existingItem) return res.json({message: "Product not in cart"})

        existingItem.amount = Number(amount)

        await cart.save()
        res.json({message: "Cart item updated", cart})
    }catch(err){
        res.json({message: "Failed to update cart item", error: err.message})
    }
}

async function deleteProductInCart (req, res) {
    try{
        let {productId} = req.params

        let cart = await cartModel.findOne({user:req.decoded._id})
        if (!cart) return res.json({message: "Cart is empty"})

        let existingItem = cart.products.find(item => item.product.toString() === productId)
        if (!existingItem) return res.json({message: "Product not in cart"})

        cart.products = cart.products.filter(item => item.product.toString() !== productId)

        await cart.save()
        res.json({message: "Deleted from cart", cart})
    }catch(err){
        res.json({message: "Failed to delete from cart", error: err.message})
    }
}

export{
    getCart,
    addToCart,
    updateCartItem,
    deleteProductInCart,
}