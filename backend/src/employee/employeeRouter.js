const express = require("express");
const EmployeeController = require("./employeeController");
const EmployerController = require("../employer/employerController");
const {employeeValidation} = require("./employeeValidation");
const {idValidation} = require("./employeeValidation");
const authenticate = require("../shared/authentication");

const router = express.Router();
router.get("/employees", authenticate, EmployeeController.findEmployees);
router.get(
  "/employees/name",
  authenticate,
  EmployeeController.findEmployeeByName
);
// router.get(
//   "/employees/skills",
//   EmployerController.authenticateEmployer,
//   EmployeeController.findAppBySkills
// );
// router.get(
//   "/employees/city",
//   EmployerController.authenticateEmployer,
//   EmployeeController.findAppByCity
// );
router.post("/employees/login", EmployeeController.login);
router.post(
  "/employees/register",
  employeeValidation,
  EmployeeController.register
);
router.get(
  "/employees/:id",
  idValidation,
  authenticate,
  EmployeeController.findOneEmployee
);
module.exports = router;
