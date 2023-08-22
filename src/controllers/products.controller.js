import { validationResult } from "express-validator";
import { Product } from '../models/products.model.js';

export const getAllProducts = async (req, res) => {
   const allProducts = await Product.findAll({});
   res.json(allProducts);
};

export const createProduct = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({
         success: false,
         errors: errors.array(),
      });
   }

   const { name, price } = req.body;
   const createdProduct = await Product.create({ name, price })

   return res.json(createdProduct);
};