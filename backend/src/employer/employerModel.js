const DbProvider = require("../../db/db");
const dbProvider = new DbProvider();

class EmployerModel {
  static async createEmployer(data) {
    const params = [data.company_id, data.name, data.email, data.password];
    const sql = `INSERT INTO employers (company_id ,name, email, password) VALUES (?, ?, ?, ?)`;
    return await dbProvider.execute(sql, params);
  }

  static async findEmployerByEmail(email) {
    const sql = `SELECT * FROM employers WHERE email = ?`;
    const rows = await dbProvider.execute(sql, [email]);
    return rows[0];
  }
}

module.exports = EmployerModel;
