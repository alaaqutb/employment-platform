const { body } = require("express-validator");

const jobValidation = [
  body("company_id").isInt(),
  body("description")
    .isAlphanumeric()
    .isLength({ max: 300 })
    .withMessage("The letters must be < 300"),
  body("requirements")
    .isAlphanumeric()
    .isLength({ max: 300 })
    .withMessage("The letters must be < 300"),
  body("title")
    .isAlpha()
    .withMessage("The name must be alphabets only!")
    .isLength({ max: 100 })
    .withMessage("The letters must be < 100"),
];

module.exports = jobValidation;
