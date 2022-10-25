const DbProvider = require("../../db/db");
const dbProvider = new DbProvider();

class EmployeeModel {
  static async getEmployeeByEmail(email) {
    const sql = `SELECT * FROM employees WHERE email = ?`;
    const rows = await dbProvider.execute(sql, [email]);
    return rows[0];
  }
  static async createEmployee(data) {
    const params = [
      data.name,
      data.city,
      data.email,
      data.skills,
      data.experience_level,
      data.bio_text,
      data.password,
      data.national_id,
    ];
    const sql = `INSERT INTO employees (name, city, email, skills, experience_level, bio_text, password, national_id) VALUES (?,?,?,?,?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getEmployee(id) {
    const sql = `SELECT * FROM employees WHERE id = ? `;
    const rows = await dbProvider.execute(sql, [id]);
    return rows[0];
  }

  static async getEmployees() {
    const sql = `SELECT * FROM employees`;
    return await dbProvider.execute(sql, []);
  }

  static async updateNumberOfViews(id, numberOfViews) {
    const sql = `UPDATE employees SET views_number = ? WHERE id = ?`;
    return await dbProvider.execute(sql, [numberOfViews, id]);
  }

  static async getEmployeeByName(name) {
    const sql = `SELECT * FROM employees WHERE name = ?`;
    return await dbProvider.execute(sql, [name]);
  }

  // static async getNumberOfCity(city) {
  //   const sql = `SELECT COUNT(city) AS NumberOfApplications FROM employees INNER JOIN employees_jobs WHERE city = ? and employees.id=employees_jobs.employee_id`;
  //   return await dbProvider.execute(sql, [city]);
  // }

  // static async getNumberOfSkills(skills) {
  //   const sql = `SELECT COUNT(skills) AS NumberOfApplications FROM employees INNER JOIN employees_jobs WHERE skills = ? and employees.id=employees_jobs.employee_id`;
  //   return await dbProvider.execute(sql, [skills]);
  // }

  // static async getNumberOfLevel(experienceLevel) {
  //   const sql = `SELECT COUNT(experience_level) AS NumberOfApplications FROM employees INNER JOIN employees_jobs WHERE experience_level = ? and employees.id=employees_jobs.employee_id`;
  //   return await dbProvider.execute(sql, [experienceLevel]);
  // }
}

module.exports = EmployeeModel;
