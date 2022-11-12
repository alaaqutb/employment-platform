const EmployeeModel = require("../employee/employeeModel");
const EmployerModel = require("../employer/employerModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { EXPIRES_IN, ISSUER, SUBJECT, ALGORITHM, PRIVATE_KEY } = process.env;
async function getProfile(req, res) {
  try {
    const token = req.headers.authorization;
    const options = {
      expiresIn: parseInt(EXPIRES_IN, 10),
      issuer: ISSUER,
      subject: SUBJECT,
      algorithm: ALGORITHM,
    };
    const decoded = jwt.verify(token, process.env.PUBLIC_KEY, options);
    if (decoded) {
      if (decoded.isAdmin) {
        const data = await EmployerModel.findEmployerByEmail(decoded.email);
        if (data) {
          res.json({ data });
          return;
        }
      } else {
        const data = await EmployeeModel.getEmployeeByEmail(decoded.email);
        if (data) {
          res.json({ data });
          return;
        }
      }
    }
  } catch (err) {
    res.json({ message: "Unauthorized !!!" });
  }
}

module.exports= getProfile;
