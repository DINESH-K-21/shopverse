import express from "express";
import Product from "../modules/ProductSchema.js";
import { protect } from "../middleware/auth.js";
import { superAdminOnly } from "../middleware/role.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});



router.post(
  "/",
  protect,
  superAdminOnly,
  async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        originalPrice,
        category,
        brand,
        images,
        stock,
        rating,
        reviews,
        featured,
        discount,
      } = req.body;

      if (!title || !description || !price || !category || stock === undefined) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      const product = await Product.create({
        title,
        description,
        price,
        originalPrice: originalPrice || price,
        category,
        brand,
        images,
        stock,
        rating,
        reviews,
        featured,
        discount,
      });

      res.status(201).json({
        success: true,
        product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);
export default router;