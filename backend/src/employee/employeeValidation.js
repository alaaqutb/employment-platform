const { body, param } = require("express-validator");

const employeeValidation = [
  body("name")
    .isAlpha()
    .withMessage("The name must be alphabets !")
    .isLength({ max: 50 })
    .withMessage(" The letters must be < 50 "),
  body("city")
    .isAlpha()
    .withMessage("The city must be alphabets ! ")
    .isLength({ max: 50 })
    .withMessage(" The letters must be < 50 "),
  body("email")
    .isEmail()
    .withMessage("Invalid Email! ")
    .isLength()
    .withMessage(" The letters must be < 50 "),
  body("skills")
    .isAlpha()
    .withMessage("skills must be alphabets ! ")
    .isLength({ max: 50 })
    .withMessage(" The letters must be < 50 "),
  body("experience_level").notEmpty().isIn(["junior", "mid", "senior"]),
  body("bio_text")
    .isAlpha()
    .withMessage("The bio must be alphabets !")
    .isLength({ max: 200 })
    .withMessage("The letters must be < 200 "),
  body("password")
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .isLength({ max: 20 })
    .withMessage("The letters must be < 20 "),
  body("national_id")
    .notEmpty()
    .matches(
      /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/,
      "i"
    ),
];

const idValidation = [
    param("id").isInt().withMessage(" The id must be integer !")
];
module.exports = { employeeValidation, idValidation };

