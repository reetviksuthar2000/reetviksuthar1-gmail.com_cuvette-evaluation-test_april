const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/list-products", async (req, res) => {
  try {
    const search = req.query.search;
    let type = req.query.type;
    let company = req.query.company;
    let price = req.query.price;
    let color = req.query.color;

    if (!search && !type && !company && !price && !color) {
      const products = await Product.find();
      return res.json({
        products,
      });
    }

    if (search) {
      const products = await Product.find({
        company: { $regex: search, $options: "i" },
      });
      return res.json({
        products,
      });
    }

    if (type) {
      const products = await Product.find({ type: { $eq: type } });
      return res.json({
        products,
      });
    }

    if (company) {
      const products = await Product.find({ company: { $eq: company } });
      return res.json({
        products,
      });
    }

    if (color) {
      const products = await Product.find({ color: { $eq: color } });
      return res.json({
        products,
      });
    }

    if (price) {
      const products = await Product.find({ price: { $gt :  "0", $lt : "1,000" } });
      return res.json({
        products,
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

router.get("/get-products/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const productdetail = await Product.findById({ _id });

    return res.json({
      success: true,
      message: "get job succesfully for description page",
      data: productdetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

module.exports = router;
