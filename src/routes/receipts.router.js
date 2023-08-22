import express from 'express';
import * as controller from '../controllers/receipts.controller.js';
import validateProductsInReceipt from '../validations/productsInReceipt.validation.js';
import validateRemovalProducts from '../validations/removal-products.validation.js';
import validateUpdate from '../validations/update.validation.js';

const receiptRouter = express.Router();

receiptRouter.get('/', controller.getAllReceipt);
receiptRouter.post('/add', validateProductsInReceipt, controller.addProductInReceipt);
receiptRouter.delete('/delete', validateRemovalProducts, controller.removalProductFromReceipt);
receiptRouter.patch('/update', validateUpdate, controller.changeProductInReceipt);
receiptRouter.patch('/close', controller.receiptClose);

export default receiptRouter;