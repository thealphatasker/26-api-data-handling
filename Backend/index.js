import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import Product from "./model/Product.js";



const app = express();

dotenv.config();

app.use(cors());
app.use(express.json())

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected!")
  } catch (error) {
    console.error("MongoDB connection error: ", error)
  }
}

ConnectDB();

// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }))

app.post("/products", async (req, res) => {
  console.log("Post Request Received!");
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server is running on Port:  8000");
});
