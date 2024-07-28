const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator"); 

const Product = require("../models/product");


const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, image, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    
    res.status(400).json({ message: "Error creating product" });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
   
    res.status(400).json({ message: "Error updating product" });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
