const { body, param } = require("express-validator");

const employeeValidation = [
  body("name")
    // .isAlpha()
    // .withMessage("The name must be alphabets only!")
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("city")
    .isAlpha()
    .withMessage("The city must be alphabets only!")
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("email")
    .isEmail()
    .withMessage("Invalid Email!")
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("skills")
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage("The letters must be < 50"),
  body("experience_level").notEmpty().isIn(["junior", "mid", "senior"]),
  body("bio_text")
    .isLength({ max: 200 })
    .withMessage("The letters must be < 200"),
  body("password").isStrongPassword(),
  body("national_id").matches(
    /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/,
    "i"
  ),
];

const idValidation = [param("id").isInt().withMessage("Invalid id!")];

module.exports = { employeeValidation, idValidation };
