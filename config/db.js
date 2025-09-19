import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2/promise';



dotenv.config({ path: "/Users/user/Desktop/SecureBank/.env" });



export async  function connectDB() {    
 try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.changeUser({ database: process.env.DB_NAME }); 

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(255)
            )
        `);


      
        return connection;
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }


}
