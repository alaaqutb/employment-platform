const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRouter = require("./src/employee/employeeRouter");
const employerRouter = require("./src/employer/employerRouter");
const jobRouter = require("./src/job/jobRouter");
const companyRouter = require("./src/company/companyRouter");
const getProfile = require("./src/shared/Profile")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("database connected as id " + connection.threadId);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(jobRouter);
app.use(employerRouter);
app.use(employeeRouter);
app.use(companyRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.get("/profile", getProfile);
// Not found
app.use((request, response) => {
  response.status(404).json({ message: "Not Found!" });
});
// Error
app.use((request, response, next, error) => {
  const status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
app.listen(PORT, HOST, () => {
  console.log(`starting server on ${HOST}:${PORT}`);
});
