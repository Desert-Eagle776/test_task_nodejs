import express from 'express';
import * as controller from '../controllers/products.controller.js';
import validateProduct from '../validations/product.validation.js';

const productRouter = express.Router();

productRouter.get('/', controller.getAllProducts);
productRouter.post('/', validateProduct, controller.createProduct);

export default productRouter;