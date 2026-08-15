import mongoose from "mongoose";
import { productModel } from "./models/products.model.js";

const jerseySizes = ["S", "M", "L", "XL", "XXL"];
const bootSizes = ["40", "41", "42", "43", "44", "45"];

const sampleProducts = [
  // Club Jerseys (12)
  { name: "Al Ahly's Home Shirt 2027 \"Red\"", team: "Al Ahly", price: 350, stock: 90, category: "Club Jerseys", image: "/images/products/al-ahly.jpg", description: "Official replica home jersey of Al Ahly, made with breathable performance fabric for match-day comfort.", sizes: jerseySizes, rating: 4.7, ratingCount: 132, badge: "BEST_SELLER", discountPercent: 20 },
  { name: "Argentina National Team Home Shirt 2026", team: "Argentina", price: 350, stock: 80, category: "Club Jerseys", image: "/images/products/argentina.jpg", description: "Official replica Argentina national team jersey with the iconic sky-blue and white stripes.", sizes: jerseySizes, rating: 4.9, ratingCount: 310 },
  { name: "Arsenal's Home Shirt 2027 \"Red\"", team: "Arsenal", price: 350, stock: 85, category: "Club Jerseys", image: "/images/products/arsenal.jpg", description: "Official replica Arsenal home jersey featuring the classic red and white design.", sizes: jerseySizes, rating: 4.5, ratingCount: 96 },
  { name: "Barcelona Home Shirt 2027", team: "Barcelona", price: 350, stock: 70, category: "Club Jerseys", image: "/images/products/barcelona.jpg", description: "Official replica Barcelona home jersey in the club's signature blaugrana colours.", sizes: jerseySizes, rating: 4.8, ratingCount: 245, badge: "SALE", discountPercent: 20 },
  { name: "Bayern Munich Home Shirt 2027 \"Red\"", team: "Bayern Munich", price: 350, stock: 65, category: "Club Jerseys", image: "/images/products/bayern.jpg", description: "Official replica Bayern Munich home jersey, crafted for fans who never miss a match.", sizes: jerseySizes, rating: 4.6, ratingCount: 88 },
  { name: "Egypt National Team Home Jersey, World Cup Version \"Red\"", team: "Egypt", price: 350, stock: 60, category: "Club Jerseys", image: "/images/products/egypt.jpg", description: "Official replica Egypt national team jersey, proudly worn by the Pharaohs.", sizes: jerseySizes, rating: 4.4, ratingCount: 54, badge: "NEW" },
  { name: "Inter Miami Away Shirt 2027 \"Black\"", team: "Inter Miami", price: 350, stock: 75, category: "Club Jerseys", image: "/images/products/inter-miami.jpg", description: "Official replica Inter Miami CF jersey in the club's distinctive pink and black.", sizes: jerseySizes, rating: 4.7, ratingCount: 178, badge: "BEST_SELLER" },
  { name: "Manchester City Home Shirt 2027 \"Light Blue\"", team: "Manchester City", price: 350, stock: 80, category: "Club Jerseys", image: "/images/products/man-city.jpg", description: "Official replica Manchester City home jersey in sky blue.", sizes: jerseySizes, rating: 4.6, ratingCount: 121 },
  { name: "Paris Saint-Germain's Home Shirt 2027 \"Blue\"", team: "Paris Saint-Germain", price: 350, stock: 70, category: "Club Jerseys", image: "/images/products/psg.jpg", description: "Official replica Paris Saint-Germain home jersey with the iconic navy, red and blue.", sizes: jerseySizes, rating: 4.8, ratingCount: 203 },
  { name: "Real Madrid Home Shirt 2027 \"White\"", team: "Real Madrid", price: 350, stock: 65, category: "Club Jerseys", image: "/images/products/real-madrid.jpg", description: "Official replica Real Madrid home jersey in classic all-white.", sizes: jerseySizes, rating: 4.9, ratingCount: 289 },
  { name: "Spain's Away Shirt, World Cup Version With Two Stars \"Off White\"", team: "Spain", price: 350, stock: 55, category: "Club Jerseys", image: "/images/products/spain.jpg", description: "Official replica Spain national team jersey, worn by La Roja.", sizes: jerseySizes, rating: 4.3, ratingCount: 47, badge: "BEST_SELLER" },
  { name: "Trabzonspor Turkish Home Shirt 2027", team: "Trabzonspor", price: 350, stock: 60, category: "Club Jerseys", image: "/images/products/trabzonspor.jpg", description: "Official replica Trabzonspor home jersey in claret and blue.", sizes: jerseySizes, rating: 4.2, ratingCount: 33 },

  // Football Boots (2)
  { name: "Stars NIKE VAPOR EDGE 360 Mirror Original \"Orange\"", team: "Nike", price: 2200, stock: 45, category: "Football Boots", image: "/images/products/boots-nike-vapor-edge-360.jpg", description: "Lightweight, precision-engineered football boots built for explosive speed on the pitch.", sizes: bootSizes, rating: 4.6, ratingCount: 64, badge: "SALE", discountPercent: 20 },
  { name: "Adidas F50 Mirror Original 2027 Stars \"Yellow\"", team: "Adidas", price: 1900, stock: 40, category: "Football Boots", image: "/images/products/boots-adidas-f50.jpg", description: "Adidas F50 boots designed for agile players who thrive on quick direction changes.", sizes: bootSizes, rating: 4.5, ratingCount: 58 },

  // Balls (2)
  { name: "UEFA Champions League 2027 Ball \"White and Silver\"", team: "", price: 600, stock: 100, category: "Balls", image: "/images/products/ball-1.jpg", description: "FIFA-quality match ball with a premium stitched cover for consistent flight and touch.", sizes: [], rating: 4.7, ratingCount: 141 },
  { name: "World Cup Ball", team: "", price: 600, stock: 100, category: "Balls", image: "/images/products/ball-2.jpg", description: "Durable training ball built to withstand daily practice sessions.", sizes: [], rating: 4.3, ratingCount: 76 },
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
