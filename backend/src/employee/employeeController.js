const EmployeeModel = require("./employeeModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const { EXPIRES_IN, ISSUER, SUBJECT, ALGORITHM, PRIVATE_KEY } = process.env;

class EmployeeController {
  static async authenticateEmployee(req, res, next) {
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
        const employee = EmployeeModel.getEmployeeByEmail(decoded.email);
        if (!employee || decoded.isAdmin) {
          res.status(401).json({ response: "Unauthorized" });
        }
      } else {
        res.status(401).json({ response: "Unauthorized" });
      }
      res.locals.auth = decoded;
      next();
    } catch (err) {
      res.status(401).json({ response: "Unauthorized" });
    }
  }
  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const employee = await EmployeeModel.getEmployeeByEmail(email);
      if (employee) {
        const result = bcrypt.compareSync(
          password + BCRYPT_PASSWORD,
          employee.password
        );
        if (result) {
          const payload = {
            id: employee.id,
            email: employee.email,
            isAdmin: false,
          };
          const options = {
            expiresIn: parseInt(EXPIRES_IN, 10),
            issuer: ISSUER,
            subject: SUBJECT,
            algorithm: ALGORITHM,
          };
          const token = jwt.sign(payload, PRIVATE_KEY, options);
          res.json({
            message: "Signed In Successfully",
            token,
          });
        } else {
          res.status(401).json({ response: "invalid email or password" });
        }
      } else {
        res.status(401).json({ response: "invalid email or password" });
      }
    } else {
      res.status(401).json({ response: "email and password are required" });
    }
  }

  static async register(req, res) {
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
      const data = req.body;
      const hashed = bcrypt.hashSync(
        data.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS)
      );
      data.password = hashed;
      await EmployeeModel.createEmployee(data);
      res.json({
        message: "Registered Successfully",
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async findOneEmployee(req, res) {
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
      const employeeId = req.params.id;
      let result = await EmployeeModel.getEmployee(employeeId);
      const numberOfViews = result.views_number + 1;
       await EmployeeModel.updateNumberOfViews(employeeId ,numberOfViews);
      res.json({result});
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async findEmployees(req, res) {
    const result = await EmployeeModel.getEmployees();
    res.json(result);
  }

 static async findEmployeeByName(req, res) {
  const employeeName = req.query.name;
  const result = await EmployeeModel.getEmployeeByName(employeeName)
  res.json(result);
 }

//  static async findAppByCity(req, res) {
//   const numberOfApp = req.query.city;
//   const result = await EmployeeModel.getNumberOfCity(numberOfApp);
//   res.json(result);
//  }

//  static async findAppBySkills(req, res) {
//   const numberOfApp = req.query.skills;
//   const result = await EmployeeModel.getNumberOfSkills(numberOfApp);
//   res.json(result);
//  }

//  static async findAppByLevel(req, res) {
//   const numberOfApp = req.query.experience_level;
//   const result = await EmployeeModel.getNumberOfLevel(numberOfApp);
//   res.json(result)
//  }
}

module.exports = EmployeeController;
