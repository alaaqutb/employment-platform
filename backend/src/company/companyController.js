const companyModel = require("./companyModel");

class CompanyController {
  static async findCompanies(req, res) {
    const data = await companyModel.getCompanies();
    res.json({ data });
  }
}
module.exports = CompanyController;