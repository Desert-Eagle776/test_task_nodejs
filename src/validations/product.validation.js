import { body } from 'express-validator';

const validateProduct = [
   body('name')
      .exists({ checkFalsy: true })
      .withMessage("Поле name є обов'язковим")
      .isString()
      .withMessage('Поле name повинно бути рядком')
      .isLength({ min: 3 })
      .withMessage('Поле name містити не менше 3 символів'),
   body('price')
      .exists({ checkFalsy: true })
      .withMessage("Поле price є обов'язковим")
      .custom(num => Number.isInteger(num))
      .withMessage('Поле price повинно бути числом')
];

export default validateProduct;