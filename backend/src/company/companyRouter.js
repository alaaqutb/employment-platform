const express = require("express");
const CompanyController = require("./companyController");

const router = express.Router();

router.get("/companies", CompanyController.findCompanies);
module.exports = router;