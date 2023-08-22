import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";
import { Product } from "./products.model.js";
import { Receipt } from "./receipt.model.js";

export const ProductsInReceipt = sequelize.define('products_in_receipt', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
   },
   receipt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   price: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
}, {
   sequelize,
   modelName: 'ProductsInReceipt',
   timestamps: false
});

Receipt.belongsToMany(Product, { through: 'products_in_receipt', foreignKey: 'receipt_id' });
Product.belongsToMany(Receipt, { through: 'products_in_receipt', foreignKey: 'product_id' });

try {
   await ProductsInReceipt.sync({});
} catch (e) {
   console.log('Помилка при створенні таблиці - ', e);
};