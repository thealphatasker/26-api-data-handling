import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "data.json");

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

app.post("/products", (req, res) => {
  console.log("Post Request Received!");
  const newProducts = req.body;
  const products = readData();
  products.push(newProducts);
  writeData(products);
  res.status(201).json(newProducts);
});

app.get("/products", (req, res) => {
  const products = readData();
  res.send(products);
});

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = readData();
  const productIndex = products.findIndex((p) => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    id: productId
  };
  
  writeData(products);
  res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = readData();
  const productIndex = products.findIndex((p) => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  products.splice(productIndex, 1);
  writeData(products);
  res.json({ message: "Product deleted successfully" });
});

app.listen(8000, () => {
  console.log("Server is running on Port:  8000");
});