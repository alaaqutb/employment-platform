const JobModel = require("./jobModel");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const EmployeeModel = require("../employee/employeeModel");

dotenv.config();
const { MAIL_USER, MAIL_PASS, MAIL_HOST } = process.env;

class JobController {
  static async postJob(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
          Data: errors,
          Message: "validation errors",
          Success: false,
        });
        return;
      }
      const data = req.body;
      const decoded = res.locals.auth;
      const employer_id = decoded ? decoded.id : null;
      await JobModel.createJob({ ...data, employer_id });

      res.json({
        message: "Job is created successfully",
      });

      const requirements = data.requirements.split(",");
      const employees = await EmployeeModel.getEmployeeBySkills(requirements);
      employees.forEach((employee) => {
        JobController.createEmail(
          "New Job!",
          `A job you may interested is published: http://localhost:5173/jobs/${data.id}`, // TODO: Job ID
          employee.email
        );
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async findJobs(req, res) {
    const data = await JobModel.getJobs();
    res.json({ data });
  }

  static async findOneJob(req, res) {
    const data = await JobModel.getOneJob(req.params.id);
    res.json({ data });
  }

  static async applyEmployeeJob(req, res) {
    const jobId = req.params.id;
    const decoded = res.locals.auth;
    const employeeId = decoded ? decoded.id : null;
    const status = "pending";
    const employeeJob = await JobModel.getEmployeeAppliedJob(employeeId, jobId);
    if (!employeeJob || employeeJob.length == 0) {
      await JobModel.applyJob([employeeId, jobId, status]);
      res.json({
        message: "Applied Successfully",
      });
    } else {
      res.json({ message: "You already applied on this job" });
    }
  }

  static async setEmployeeJobStatus(req, res) {
    try {
      const jobId = req.params.jobId;
      const employeeId = req.params.employeeId;
      const newStatus = req.query.status;
      // 1. validate jobId, employeeId and newStatus
      if (!jobId || !employeeId || !['rejected', 'accepted'].includes(newStatus)) {
        res.json({message: "Invalid Process"});
      } else {
        // 2. get employeeJob
        // if it exists and the status is pending, update status
        const employeeJob = await JobModel.getEmployeeAppliedJob(employeeId, jobId);
        if (employeeJob && employeeJob.status === 'pending') {
          // update status
          await JobModel.updateEmployeeJobStatus(employeeId, jobId, newStatus);
          res.json({message: `Process Done: ${newStatus}`});

          const employee = await EmployeeModel.getEmployee(employeeId);
          // send notification
          JobController.createEmail(
            `job: ${employeeJob.title} response`,
            `you are ${newStatus} of the job with title: ${employeeJob.title}`,
            employee.email
          );
        } else {
          // 3. cannot update status
          res.json({message: "Invalid Process"});
        }
      }
    } catch(err) {
      console.log(err.stack);
    }
  }

  static async findEmployeeJob(req, res) {
    const jobId = req.params.id;
    const data = await JobModel.getJobEmployee(jobId);
    res.json({ data });
  }

  static async findJobByTitle(req, res) {
    const jobTitle = req.query.title;
    const data = await JobModel.getJobByTitle(jobTitle);
    res.json({ data });
  }

  static createEmail(subject, body, email) {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
    const options = {
      from: MAIL_USER,
      to: email,
      subject: subject,
      text: body,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = JobController;
