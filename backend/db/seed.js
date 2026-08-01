import mongoose from "mongoose";
import { productModel } from "./models/products.model.js";

const sampleProducts = [
  { name: "Fresh Bananas (1kg)", price: 25, stock: 120, category: "Fruits", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Fresh+Bananas&font=roboto" },
  { name: "Whole Wheat Bread", price: 18, stock: 60, category: "Bakery", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Whole+Wheat+Bread&font=roboto" },
  { name: "Organic Eggs (12pc)", price: 45, stock: 80, category: "Dairy & Eggs", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Organic+Eggs&font=roboto" },
  { name: "Extra Virgin Olive Oil (1L)", price: 120, stock: 40, category: "Pantry", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Olive+Oil&font=roboto" },
  { name: "Basmati Rice (5kg)", price: 150, stock: 55, category: "Pantry", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Basmati+Rice&font=roboto" },
  { name: "Fresh Tomatoes (1kg)", price: 15, stock: 100, category: "Vegetables", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Fresh+Tomatoes&font=roboto" },
  { name: "Chicken Breast (1kg)", price: 90, stock: 35, category: "Meat & Poultry", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Chicken+Breast&font=roboto" },
  { name: "Greek Yogurt (500g)", price: 35, stock: 70, category: "Dairy & Eggs", image: "https://placehold.co/400x400/FFEFDE/994114.png?text=Greek+Yogurt&font=roboto" },
];

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myProject");
    console.log("Database connected successfully");

    await productModel.deleteMany({});
    await productModel.insertMany(sampleProducts);

    console.log(`Seeded ${sampleProducts.length} products successfully`);
  } catch (err) {
    console.log("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
