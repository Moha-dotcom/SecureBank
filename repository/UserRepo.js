// repositories/UserRepo.js
import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";
import UserValidation from "../validation/Uservalidation.js";
import User from "../models/User.js";

export default class UserRepo {
  static async registerUser(name, email, password) {
    // Validate input
    let isValid = UserValidation(name, email, password);
    if (!isValid) return "Invalid User Data";

    const db = await connectDB();

    // Check if email already exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) return "Email already exists";

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user entity
    const newUser = new User(name, email, hashedPassword);

    // Save to DB
    await db.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [newUser.id, newUser.name, newUser.email, newUser.password]
    );

    return newUser.toJSON();
  }

  static async loginUser(email, password) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return "User not found";
    }

    const user = rows[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return "Invalid password";

    return { id: user.id, name: user.name, email: user.email };
  }

  static async findUserByEmail(email) {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  }
}
