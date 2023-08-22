import { DataTypes } from 'sequelize';
import { sequelize } from '../db/config.js';

export const Product = sequelize.define('Product', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   price: {
      type: DataTypes.INTEGER,
      allowNull: false,
   }
}, {
   sequelize,
   modelName: 'Product',
   timestamps: false
});

try {
   await Product.sync({});
} catch (e) {
   console.log('Помилка при створенні таблиці - ', e);
};