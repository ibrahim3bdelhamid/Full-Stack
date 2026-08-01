import { model, Schema } from "mongoose";

const reqNum = { type: Number, required: true, min: 0 };

export const productModel = model("Product", new Schema({
    name: { type: String, required: true },
    price: reqNum,
    stock: reqNum,
    category: String,
    image: String,
}, {
    timestamps: true,
    versionKey: false
}));