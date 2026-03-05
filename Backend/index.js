import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}))

const products = [
  {
    id: 1,
    name: "Asus Rog Strix Z590-E",
    price: 75000,
    desc: "Gaming Motherboard of ATX Computer",
    img: "https://m.media-amazon.com/images/I/61j7Seo+m0L._AC_UF1000,1000_QL80_.jpg",
  },
];

app.post("/products", (req, res) => {
  console.log("Post Request Received!");
  const newProducts = req.body;
  products.push(newProducts);
  res.status(201).json(newProducts);
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.listen(8000, () => {
  console.log("Server is running on Port:  8000");
});
