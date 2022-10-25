const EmployerModel = require("./employerModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const { EXPIRES_IN, ISSUER, SUBJECT, ALGORITHM, PRIVATE_KEY } = process.env;

class EmployerController {
  static async authenticateEmployer(req, res, next) {
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
        const employer = await EmployerModel.findEmployerByEmail(decoded.email);
        if (!employer || !decoded.isAdmin) {
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
      const employer = await EmployerModel.findEmployerByEmail(email);
      if (employer) {
        const result = bcrypt.compareSync(
          password + BCRYPT_PASSWORD,
          employer.password
        );
        if (result) {
          const payload = {
            id: employer.id,
            email: employer.email,
            isAdmin: true,
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
      await EmployerModel.createEmployer(data);
      res.json({
        message: "Registered Successfully",
      });
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = EmployerController;
