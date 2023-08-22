import express from 'express';
import productRouter from './src/routes/products.router.js';
import receiptRouter from './src/routes/receipts.router.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);
app.use('/receipts', receiptRouter);

const start = () => {
   try {
      app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT}...`));
   } catch (e) {
      console.log(e);
   }
};

start();