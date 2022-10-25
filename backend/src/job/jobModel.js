const DbProvider = require("../../db/db");
const dbProvider = new DbProvider();

class JobModel {
  static async createJob(params) {
    const sql = `INSERT INTO jobs (company_id, employer_id, description, requirements, title) VALUES (?,?,?,?,?)`;
    return await dbProvider.execute(sql, params);
  }

  static async getJobs() {
    const sql = `SELECT * FROM jobs`;
    return await dbProvider.execute(sql, []);
  }

  static async getOneJob(id) {
    const sql = `SELECT * FROM jobs WHERE id = ?`;
    return await dbProvider.execute(sql, [id]);
  }

  static async applyJob(params) {
    const sql = `INSERT INTO employees_jobs (employee_id, job_id, status) VALUES (?, ?, ?)`;
    return await dbProvider.execute(sql, params);
  }

  static async getJobEmployee(jobId) {
    const sql = `SELECT * FROM employees INNER JOIN employees_jobs ON employees.id = employees_jobs.employee_id AND employees_jobs.job_id = ?`;
    return await dbProvider.execute(sql, [jobId]);
  }

  static async getEmployeeAppliedJob(employeeId, jobId) {
    const sql = `SELECT * FROM employees_jobs WHERE employee_id = ? AND job_id = ?`;
    return await dbProvider.execute(sql, [employeeId, jobId]);
  }

  static async getJobByTitle(title) {
    const sql = `SELECT * FROM jobs WHERE title = ?`;
    const rows = await dbProvider.execute(sql, [title]);
    return rows;
  }
}

module.exports = JobModel;
