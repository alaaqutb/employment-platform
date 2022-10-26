const EmployeeModel = require("../employee/employeeModel");
const EmployerModel = require("../employer/employerModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { EXPIRES_IN, ISSUER, SUBJECT, ALGORITHM, PRIVATE_KEY } = process.env;

async function authenticate(req, res, next) {
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
        const employer = await EmployerModel.findEmployerByEmail(decoded.email);
        if (!employer) {
          res.json({ message: "Unauthenticated" });
          return;
        }
      } else {
        const employee = await EmployeeModel.getEmployeeByEmail(decoded.email);
        if (!employee) {
          res.json({ message: "Unauthenticated" });
          return;
        }
      }
    }
    res.locals.auth = decoded;
    next();
  } catch (err) {
    res.json({ message: "Unauthorized !!!" });
  }
}

module.exports = authenticate;
