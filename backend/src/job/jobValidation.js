const { body } = require("express-validator");

const jobValidation = [
  body("id").isInt(),
  body("company_id").isInt().withMessage("The id must be integer !"),
  body("employer_id").isInt().withMessage("The id must be integer !"),
  body("description")
    .isAlphanumeric()
    .withMessage("The name must be alphabets !")
    .isLength({ max: 300 })
    .withMessage(" The letters must be < 300 "),
  body("requirements")
    .isAlphanumeric()
    .withMessage("The name must be alphabets !")
    .isLength({ max: 300 })
    .withMessage(" The letters must be < 300 "),
  body("title")
    .isAlpha()
    .withMessage("The name must be alphabets !")
    .isLength({ max: 100 })
    .withMessage(" The letters must be < 50 "),
];

module.exports = jobValidation;