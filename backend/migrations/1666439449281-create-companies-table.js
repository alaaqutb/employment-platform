"use strict";
const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE companies (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    field VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE companies`;
  await dbProvider.execute(sql, []);
  next();
};
