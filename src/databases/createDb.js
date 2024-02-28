require('dotenv').config();
const mysql2 = require('mysql2');
const dbConfig = require('../config/db');

const { host, password, user } = dbConfig;

const con = mysql2.createConnection({
  host,
  user,
  password,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected');
  con.query('CREATE DATABASE mydb', (error) => {
    if (error) throw error;
    console.log('Database created');
  });
});
