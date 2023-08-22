import { body, validationResult } from 'express-validator';

const validateUpdate = [
   body('id')
      .exists({ checkFalsy: true })
      .withMessage("Поле id є обов'язковим")
      .custom(num => Number.isInteger(num))
      .withMessage('Поле id повинно бути числом'),
   body('quantity')
      .exists({ checkFalsy: true })
      .withMessage("Поле quantity є обов'язковим")
      .custom(num => Number.isInteger(num))
      .withMessage('Поле quantity повинно бути числом'),
   function (req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            success: false,
            errors: errors.array(),
         });
      }

      next();
   }
];

export default validateUpdate;