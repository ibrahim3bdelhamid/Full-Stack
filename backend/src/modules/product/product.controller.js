import { productModel } from "../../../db/models/products.model.js"

function addProduct(req, res){
    productModel.insertMany(req.body)
    res.json({message:"Products added successfully"})
}

async function getProducts(req, res){
    let product = await productModel.find()
    res.json({message:"all products", product})
}

async function updatedProduct(req, res) {
    try{
        let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!product) return res.status(404).json({message: "Product not found"})   
        res.json({message: "Product updated", product: product})  
    }catch(err) {
        res.json({message: "Update failed", error: err.message})
    }
}

async function deleteProduct(req, res) {
    try{
        let product = await productModel.findByIdAndDelete(req.params.id)
        if(!product) return res.status(404).json({message: "Product not found"})   
        res.json({message: "Product deleted"})  
    }catch(err) {
        res.json({message: "Deletion failed", error: err.message})
    }
}

export{
    addProduct,
    getProducts,
    updatedProduct,
    deleteProduct
}