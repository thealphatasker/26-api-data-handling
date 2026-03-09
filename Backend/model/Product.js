import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;