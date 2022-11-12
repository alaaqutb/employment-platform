const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class JobModel {
  static async createJob(data) {
    const params = [
      data.company_id,
      data.employer_id,
      data.description,
      data.requirements,
      data.title,
    ];
    const sql = `INSERT INTO jobs (company_id, employer_id, description, requirements, title) VALUES (?,?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getJobs(offset, limit) {
    const sql = `SELECT * FROM jobs INNER JOIN companies ON companies.id=jobs.id LIMIT ?, ?`;
    return await dbProvider.execute(sql, [offset, limit]);
  }

  static async getJobsCount() {
    const sql = `SELECT COUNT(*) as count FROM jobs`;
    const rows = await dbProvider.execute(sql, []);
    return rows[0];
  }

  static async getOneJob(id) {
    const sql = `SELECT * FROM jobs INNER JOIN companies ON companies.id=jobs.id AND jobs.id = ?`;
    const rows = await dbProvider.execute(sql, [id]);
    return rows[0];
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
    const sql = `SELECT * FROM employees_jobs INNER JOIN jobs ON employees_jobs.job_id = jobs.id
      WHERE employees_jobs.employee_id = ? AND employees_jobs.job_id = ?`;
    const rows = await dbProvider.execute(sql, [employeeId, jobId]);
    return rows[0];
  }

  static async updateEmployeeJobStatus(employeeId, jobId, newStatus) {
    const sql = `UPDATE employees_jobs SET status = ? WHERE job_id = ? AND employee_id = ?`;
    await dbProvider.execute(sql, [newStatus, jobId, employeeId]);
  }

  static async getJobByTitle(title) {
    const sql = `SELECT * FROM jobs WHERE title REGEXP ?`;
    const rows = await dbProvider.execute(sql, [title]);
    return rows;
  }
}

module.exports = JobModel;
