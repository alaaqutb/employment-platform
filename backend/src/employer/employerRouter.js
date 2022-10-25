const express = require("express");
const EmployerController = require("./employerController");
const employerValidation = require("./employerValidation");

const router = express.Router();
router.post("/employers/login", EmployerController.login);
router.post(
  "/employers/register",
  employerValidation,
  EmployerController.register
);

module.exports = router;
