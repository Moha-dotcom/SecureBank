// repositories/UserRepo.js
import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";
import UserValidation from "../validation/Uservalidation.js";
import User from "../models/User.js";
import pino from 'pino';



const logger = pino(
  { level: "info" },
  pino.transport({
    target: "pino-pretty",
    options: { colorize: true }
  })
);

export default class UserRepo {
  /**
   * Insert a new user into the database
   * @param {User} user
   */
  static async insertUser(user) {
    try {
      const db = await connectDB();
      const sql = `
        INSERT INTO users (id, name, email, password, account_number, routing_number)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await db.query(sql, [
        user.id,
        user.name,
        user.email,
        user.password,
        user.getAccountNum(),
        user.getRoutingNumber()
      ]);
      logger.info(`User inserted: ${user.email}`);
      return user.toJSON();
    } catch (error) {
      logger.error(`DB error inserting user: ${error.message}`);
      throw error;
    }
  }

  static async findUserByEmail(email) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async findProviderByLocation(location) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM providers WHERE location = ?", [location]);
    return rows.length > 0 ? rows[0] : null;
  }
}
