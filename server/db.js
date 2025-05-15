import mysql from 'mysql';  //mysql2/promise
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const db = mysql.createConnection({
    user: process.env.SQL_USER,
    host: process.env.SQL_HOST,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    ssl: {
        rejectUnauthorized: true 
      }
})

const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export { db, queryAsync };
