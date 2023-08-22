import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
   process.env.DB,
   process.env.USER,
   process.env.PASSWORD,
   {
      host: process.env.HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DIALECT,
   }
);

try {
   await sequelize.authenticate()
   console.log("З'єднання з БД було успішно встановлено");
} catch (e) {
   console.log('Неможливо виконати підключення до БД: ', e);
}