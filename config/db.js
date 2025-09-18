import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';



dotenv.config({ path: "/Users/user/Desktop/SecureBank/.env" });

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


          await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE
            )
        `);

        console.log("Ensured database and users table exist");

        console.log(`Using database '${process.env.DB_NAME}'`);
        return connection;
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}



