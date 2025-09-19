// repositories/UserRepo.js
import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";
import UserValidation from "../validation/Uservalidation.js";
import User from "../models/User.js";
import pino from 'pino';

// Initialize logger


const logger = pino({level: 'info',},pino.transport({target: 'pino-pretty',options: {colorize: true, }}));




/**
 * Repository class for handling User-related database operations
 */
export default class UserRepo  {

  /**
   * Registers a new user
   * @param {string} name - Full name of the user
   * @param {string} email - User's unique email
   * @param {string} password - Plain text password
   * @param {string} location - User location (must match provider)
   * @returns {Object|string} - Created user JSON or error string
   */
  static async registerUser(name, email, password, location) {
    try {
      logger.info(`Registering user: ${email}`);

      // Validate user input
      let isValid = UserValidation(name, email, password, location);
      if (!isValid) {
        logger.warn(`Invalid user data for: ${email}`);
        return "Invalid User Data";
      }

      const db = await connectDB();

      // Check if email already exists
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length > 0) {
        logger.warn(`Email already exists: ${email}`);
        return "Email already exists";
      }

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      logger.info(`Password hashed for user: ${email}`);

      // Check if provider exists for location
      const response = await this.findIfLocationExists(location);
      if (response === "No providers available in your location") {
        logger.warn(`No provider in location: ${location}`);
        return response;
      }

      const routingNum = response.routing_number;
      const userLocation = response.location;

      // Create User entity
      const user = new User(name, email, hashedPassword, userLocation, routingNum);
      logger.info(`User entity created: ${email}, Account: ${user.getAccountNum()}`);

      // Insert into DB
      const sql = `
        INSERT INTO users 
        (id, name, email, password, account_number, routing_number) 
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

      logger.info(`User registered successfully: ${email}`);
      return user.toJSON();
    } catch (error) {
      logger.error(`Error registering user: ${error.message}`);
      throw error;
    }
  }

  /**
   * Logs in a user
   * @param {string} email
   * @param {string} password
   * @returns {Object|string} - User data if successful or error string
   */
  static async loginUser(email, password) {
    try {
      logger.info(`Login attempt for user: ${email}`);
      const db = await connectDB();
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

      if (rows.length === 0) {
        logger.warn(`User not found: ${email}`);
        return "User not found";
      }

      const user = rows[0];
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        logger.warn(`User Entered incorrect email: ${email}`);
        return "Invalid password";
      }

      logger.info(`User logged in successfully: ${email}`);
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      logger.error(`Login error for user ${email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Finds a user by email
   * @param {string} email
   * @returns {Object|null} - User object if found
   */
  static async findUserByEmail(email) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Checks if a provider exists in a location
   * @param {string} location
   * @returns {Object|string} - Provider object or error string
   */
  static async findIfLocationExists(location) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM providers WHERE location = ?", [location]);
    return rows.length > 0 ? rows[0] : "No providers available in your location";
  } 
}
