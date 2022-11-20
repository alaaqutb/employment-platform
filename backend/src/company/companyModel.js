const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class companyModel {
  static async getCompanies() {
    const sql = `SELECT * FROM companies`;
    return await dbProvider.execute(sql, []);
  }
}
module.exports = companyModel;