import mysql from 'mysql';
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

export default db;