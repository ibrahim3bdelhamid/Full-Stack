import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number
        }
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true,
    versionKey: false
});

export const orderModel = model("Order", orderSchema)
