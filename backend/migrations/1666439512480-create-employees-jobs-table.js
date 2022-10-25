"use strict";
const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE employees_jobs (
    employee_id INT,
    job_id INT,
    status ENUM ('rejected', 'accepted', 'pending'),
    FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE employees_jobs`;
  await dbProvider.execute(sql, []);
  next();
};
