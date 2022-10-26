"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    skills VARCHAR(50) NOT NULL,
    experience_level ENUM ('junior', 'mid', 'senior') NOT NULL,
    bio_text VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    national_id VARCHAR(50) NOT NULL UNIQUE,
    views_number SMALLINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE employees`;
  await dbProvider.execute(sql, []);
  next();
};
