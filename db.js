const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',          
  user: 'root',                
  password: 'v@1Gunthmysql',  
  database: 'employee_db',    
  waitForConnections: true,
});

module.exports = connection.promise(); 
