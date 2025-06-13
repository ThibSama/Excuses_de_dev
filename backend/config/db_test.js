const mysql = require("mysql2/promise");

const TEST_DB_NAME = "excuses_de_dev_test";

async function setupTestDatabase() {
  const rootConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  await rootConnection.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME}`);
  await rootConnection.query(`CREATE DATABASE ${TEST_DB_NAME}`);
  await rootConnection.end();

  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: TEST_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await pool.query(`
       CREATE TABLE tags (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL
       );
       CREATE TABLE excuses (
         id INT AUTO_INCREMENT PRIMARY KEY,
         http_code INT NOT NULL,
         tag_id INT NOT NULL,
         message TEXT NOT NULL,
         FOREIGN KEY (tag_id) REFERENCES tags(id)
       );
       INSERT INTO tags (name) VALUES ('Inexcusable'), ('Novelty Implementations');
       INSERT INTO excuses (http_code, tag_id, message) VALUES
         (701, 1, 'Meh'),
         (710, 2, 'PHP');
     `);

  return pool;
}

async function teardownTestDatabase(pool) {
  await pool.end();
  const rootConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_local_password", // Remplace par ton mot de passe MySQL
  });
  await rootConnection.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME}`);
  await rootConnection.end();
}

module.exports = { setupTestDatabase, teardownTestDatabase };
