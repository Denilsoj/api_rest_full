const { pool } = require('./poolDb');

pool.getConnection((error, conn) => {
  const sql = `
  CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
  )`;
  conn.query(sql, (err, ress) => {
    if (err) throw err;

    console.log('table created');
    console.log(ress);
  });
});
