const express = require("express");
const JobController = require("./jobController");
const EmployeeController = require("../employee/employeeController");
const EmployerController = require("../employer/employerController");
const authenticate = require("../shared/authentication");
const { idValidation } = require("../employee/employeeValidation");

const router = express.Router();

router.get("/jobs", authenticate, JobController.findJobs);
router.post(
  "/jobs",
  EmployerController.authenticateEmployer,
  JobController.postJob
);
router.get("/jobs/title", authenticate, JobController.findJobByTitle);
router.get("/jobs/:id", idValidation, JobController.findOneJob);
router.post(
  "/jobs/:id/apply",
  EmployeeController.authenticateEmployee,
  JobController.applyEmployeeJob
);
router.get(
  "/jobs/:id/employees",
  EmployerController.authenticateEmployer,
  JobController.findEmployeeJob
);
router.post(
  "/jobs/:jobId/employees/:employeeId",
  EmployerController.authenticateEmployer,
  JobController.setEmployeeJobStatus
);

module.exports = router;
