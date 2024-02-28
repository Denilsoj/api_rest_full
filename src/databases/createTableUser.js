const { pool } = require('./poolDb');

pool.getConnection((error, conn) => {
  const sql = 'CREATE TABLE user (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,name VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)';
  conn.query(sql, (err, ress) => {
    if (err) throw err;

    console.log('table created');
    console.log(ress);
  });
});
