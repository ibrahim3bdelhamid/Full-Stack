import { model, Schema } from "mongoose";

const reqNum = { type: Number, required: true, min: 0 };

export const productModel = model("Product", new Schema({
    name: { type: String, required: true },
    price: reqNum,
    stock: reqNum,
    category: String,
    team: String,
    image: String,
    description: String,
    sizes: { type: [String], default: [] },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    badge: { type: String, enum: ["NEW", "SALE", "BEST_SELLER", null], default: null },
    discountPercent: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false
}));
