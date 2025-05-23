import mysql from 'mysql';  //mysql2/promise
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({
    path: '../.env'
});


// Create the database connection using credentials from the .env file
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