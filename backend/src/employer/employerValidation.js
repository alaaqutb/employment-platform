const { body, param } = require("express-validator");

const employerValidation = [
  body("id").isInt(),
  body("company_id").isInt().withMessage("The id must be integer !"),
  body("name")
    .isAlpha()
    .withMessage("The name must be alphabets !")
    .isLength({ max: 50 })
    .withMessage(" The letters must be < 50 "),
  body("email")
    .isEmail()
    .withMessage("The email must be email format !")
    .isAlpha()
    .withMessage("The email must be alphabets ! ")
    .isLength()
    .withMessage(" The letters must be < 50 "),
  body("password")
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .isLength({ max: 20 })
    .withMessage("The letters must be < 20 "),
];

module.exports = employerValidation;
