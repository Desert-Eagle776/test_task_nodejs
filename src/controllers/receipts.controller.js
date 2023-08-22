import { ProductsInReceipt } from "../models/products-in-receipt.model.js";
import { Receipt } from "../models/receipt.model.js";
import { Product } from "../models/products.model.js";

export const getAllReceipt = async (req, res) => {
   try {
      const allReceipt = await Receipt.findAll({});
      res.json(allReceipt);
   } catch (e) {
      return res.status(500).json({
         success: false,
         msg: 'Internal Server Error',
         errors: e,
      });
   };
};

export const addProductInReceipt = async (req, res) => {
   try {
      const { product_id, quantity } = req.body;
      let receipt_id = req.body.receipt_id;

      if (!receipt_id) {
         receipt_id = (await Receipt.create({}));
      }
      const lastNumberInReceipts = await Receipt.findOne({
         order: [['number', 'DESC']]
      });

      const findOutPriceProduct = await Product.findByPk(product_id);
      const addingProduct = await ProductsInReceipt.create({
         product_id: product_id,
         receipt_id: lastNumberInReceipts.dataValues.number,
         quantity,
         price: findOutPriceProduct.price,
      });

      const findReceiptData = await Receipt.findByPk(lastNumberInReceipts.dataValues.number);
      const summa = quantity * findOutPriceProduct.price;
      const totalInReceipt = lastNumberInReceipts.dataValues.total + summa;
      const updateTotalInReceipt = await Receipt.update(
         { total: totalInReceipt },
         { where: { id: lastNumberInReceipts.dataValues.number } }
      );

      return res.json(addingProduct);
   } catch (e) {
      return res.status(500).json(e);
   };
};

export const removalProductFromReceipt = async (req, res) => {
   try {
      const { product_id } = req.body;
      const removeProduct = await ProductsInReceipt.destroy({ where: { product_id: product_id } });

      return res.status(200).json('Видалення пройшло успішно');
   } catch (e) {
      return res.status(500).json(e);
   };
};

export const changeProductInReceipt = async (req, res, next) => {
   try {
      const { quantity, product_id } = req.body;
      const idProductsInReceipt = req.body.id;

      const findOutPriceProduct = await Product.findByPk(product_id);
      const findReceiptData = await Receipt.findByPk(idProductsInReceipt);
      const totalInReceipt = findReceiptData.total + (quantity * findOutPriceProduct.price);

      // Оновлення кількості товарів в чекові
      const updateQuantity = await ProductsInReceipt.update(
         { quantity: quantity },
         { where: { id: idProductsInReceipt } },
      );
      // Оновлення поля total в чекові
      const updateTotal = await Receipt.update(
         { total: totalInReceipt },
         { where: { id: findReceiptData.id } }
      )
      return res.status(200).json('Оновлення успішно виконано');
   } catch (e) {
      console.log("Виникла помилка: ", e);
      return res.status(500).json({
         success: false,
         message: "Оновлення неможливе",
         errors: e
      });
   };
};

export const receiptClose = async (req, res) => {
   try {
      const { receipt_id } = req.body;
      const date = new Date().toISOString();
      const updateClosingDate = await Receipt.update(
         { date: date },
         { where: { id: receipt_id } });

      return res.status(200).json('Оновлення дати пройшло успішно');
   } catch (e) {
      return res.status(500).json(e);
   };
};