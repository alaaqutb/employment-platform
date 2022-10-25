const JobModel = require("./jobModel");
const { validationResult } = require("express-validator");

class JobController {
  static async postJob(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          Data: errors,
          Message: "validation errors",
          Success: false,
        });
        return;
      }
      const data = Object.values(req.body);
      await JobModel.createJob(data);
      res.json(req.body);
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async findJobs(req, res) {
    const result = await JobModel.getJobs();
    res.json(result);
  }

  static async findOneJob(req, res) {
    const result = await JobModel.getOneJob(req.params.id);
    res.json(result);
  }

  static async applyEmployeeJob(req, res) {
    const jobId = req.params.id;
    const decoded = res.locals.auth;
    const employeeId = decoded ? decoded.id : null;
    const status = "pending";
    const employeeJob = await JobModel.getEmployeeAppliedJob(employeeId, jobId);
    if (employeeJob && employeeJob.length == 0) {
      await JobModel.applyJob([employeeId, jobId, status]);
      res.json({
        message: "Applied Successfully",
      });
    } else {
      res.json({ message: "You applied on this job" });
    }
  }

  static async findEmployeeJob(req, res) {
    const jobId = req.params.id;
    const result = await JobModel.getJobEmployee(jobId);
    res.json(result);
  }

  static async findJobByTitle(req, res) {
    const jobTitle = req.query.title;
    const result = await JobModel.getJobByTitle(jobTitle);
    res.json( result );
  }
}

module.exports = JobController;
