"use strict";
const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE jobs (
    id INT AUTO_INCREMENT NOT NULL,
    company_id INT NOT NULL,
    employer_id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    requirements VARCHAR(100) NOT NULL,
    title VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    FOREIGN KEY (employer_id) REFERENCES employers (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE jobs`;
  await dbProvider.execute(sql, []);
  next();
};
