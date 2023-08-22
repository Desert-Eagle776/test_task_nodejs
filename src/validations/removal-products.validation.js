import { body, validationResult } from 'express-validator';

const validateRemovalProducts = [
   body('product_id')
      .exists({ checkFalsy: true })
      .withMessage("Поле product_id є обов'язковим")
      .custom(num => Number.isInteger(num))
      .withMessage('Поле product_id повинно бути числом'),
   function (req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            success: false,
            errors: errors.array(),
         });
      }
      next()
   },
];

export default validateRemovalProducts;