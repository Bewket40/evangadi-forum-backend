import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbconfig = {
    host: process.env.DB_HOST , 
    port: process.env.DB_PORT , 
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

}

// Creating connection pool
const pool = mysql.createPool(dbconfig);

export default pool;


// config/databaseConfig.js
// config/databaseConfig.js
// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();
// const { Pool } = pkg;

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER || 'evangadiforum_d1e8',
//   password: process.env.DB_PASSWORD || '0EmEWpRcAXAtAbfV9dfv46Pi9a6PQYsO',
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'evangadiforum_d1e8',
//   ssl: { rejectUnauthorized: false }, // important for hosted PostgreSQL
// });

// export default pool;
