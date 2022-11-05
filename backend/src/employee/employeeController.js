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
          res.json({ message: "Unauthenticated" });
        }
      } else {
        res.json({ message: "Unauthenticated" });
      }
      res.locals.auth = decoded;
      next();
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (email && password) {
        const employee = await EmployeeModel.getEmployeeByEmailForLogin(email);
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
            res.json({ message: "invalid email or password" });
          }
        } else {
          res.json({ message: "invalid email or password" });
        }
      } else {
        res.json({ message: "email and password are required" });
      }
    } catch (err) {
      console.log(err.stack);
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
      const employeesEmail = await EmployeeModel.getEmployeeByEmail(data.email);
      const employeesNationalId = await EmployeeModel.getEmployeeByNationalId(data.national_id);
      if (employeesEmail || employeesNationalId) {
        res.json({message: "Email or National ID already exists"});
      } else {
        const hashed = bcrypt.hashSync(
          data.password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS)
        );
        data.password = hashed;
        await EmployeeModel.createEmployee(data);
        res.json({
          success: true,
          message: "Registered Successfully",
        });
      }
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
      let data = await EmployeeModel.getEmployee(employeeId);
      const numberOfViews = data.views_number + 1;
     await EmployeeModel.updateNumberOfViews(employeeId, numberOfViews);
      res.json({ data });
    } catch (err) {
      console.log(err.stack);
    }
  }

  static async findEmployees(req, res) {
    const pageNumber =  req.query.page;
    const offset = (pageNumber-1) * 10;
    const data = await EmployeeModel.getEmployees(offset);
    res.json({ data });
  }

  static async findEmployeeByName(req, res) {
    const employeeName = req.query.name;
    const data = await EmployeeModel.getEmployeeByName(employeeName);
    res.json({ data });
  }

  static async findAppByCity(req, res) {
    const numberOfApp = req.query.city;
    const result = await EmployeeModel.getNumberOfCity(numberOfApp);
    res.json(result);
  }

  static async findAppBySkills(req, res) {
    const numberOfApp = req.query.skills;
    const result = await EmployeeModel.getNumberOfSkills(numberOfApp);
    res.json(result);
  }

  static async findAppByLevel(req, res) {
    const numberOfApp = req.query.experience_level;
    const result = await EmployeeModel.getNumberOfLevel(numberOfApp);
    res.json(result);
  }

  static async findAppByBio(req, res) {
    const numberOfApp = req.query.bio_text;
    const result = await EmployeeModel.getNumberOfBio(numberOfApp);
    res.json(result);
  }
}

module.exports = EmployeeController;
