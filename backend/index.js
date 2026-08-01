import express from "express"
import cors from "cors"
import { dbConnection } from "./db/dbConnection.js"
import { userRoutes } from "./src/modules/user/user.routes.js"
import { cartRoutes } from "./src/modules/cart/cart.routes.js"
import { productRoutes } from "./src/modules/product/product.routes.js"
import { checkoutRoutes } from "./src/modules/checkout/checkout.routes.js"

const app = express()

dbConnection()

app.use(cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "token"],
}))

app.use(userRoutes)
app.use(cartRoutes)
app.use(productRoutes)
app.use(checkoutRoutes)

app.listen(3000, ()=>{
    console.log("server running"); 
})