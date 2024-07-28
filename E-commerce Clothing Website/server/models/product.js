const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft, comfortable, and versatile.",
    price: 19.99,
    image: "/images/Classic_White_T-Shirt.jpg",
    category: "T-Shirts",
  },
  {
    name: "Black Graphic Tee",
    description: "Cool graphic design on a black t-shirt.",
    price: 24.99,
    image: "/images/Black_Graphic_Teead.jpg",
    category: "T-Shirts",
  },
  {
    name: "Blue Denim Shirt",
    description: "Classic denim shirt for any occasion.",
    price: 39.99,
    image: "/images/Blue_Denim.jpg",
    category: "Shirts",
  },
];

Product.insertMany(products)
  .then(() => console.log("Products seeded"))
  .catch((err) => console.error(err));
