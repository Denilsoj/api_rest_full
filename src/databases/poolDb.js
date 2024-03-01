const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  password: 'senha',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
  idleTimeout: 60000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = {
  pool,
};
