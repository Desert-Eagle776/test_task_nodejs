import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

export const Receipt = sequelize.define('Receipt', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
   },
   number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 1
   },
   date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
   },
   total: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
   }
}, {
   sequelize,
   modelName: 'Receipt',
   timestamps: false
});

try {
   await Receipt.sync({});
} catch (e) {
   console.log('Помилка при створенні таблиці - ', e);
};