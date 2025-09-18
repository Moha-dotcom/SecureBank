import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); 


export async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log("Connected to MySQL server");

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.changeUser({ database: process.env.DB_NAME });

        console.log(`Using database '${process.env.DB_NAME}'`);
        return connection;
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}
