import mongoose, { model, Schema } from "mongoose"

const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: "Product" },
            amount: { type: Number, default: 1, min: 1 }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

export const cartModel = model("Cart", cartSchema)