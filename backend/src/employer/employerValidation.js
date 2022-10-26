const { body, param } = require("express-validator");

const employerValidation = [
  body("company_id").isInt(),
  body("name")
    .isAlpha()
    .withMessage("The name must be alphabets only!")
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("email")
    .isEmail()
    .withMessage("Invalid Email!")
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("password").isStrongPassword(),
];

module.exports = employerValidation;
