// services/UserService.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import UserRepo from "../repositories/UserRepo.js";
import UserValidation from "../validation/Uservalidation.js";
import pino from "pino";

const logger = pino(
  { level: "info" },
  pino.transport({
    target: "pino-pretty",
    options: { colorize: true }
  })
);

export default class UserService {
  static async registerUser(name, email, password, location) {
    try {
      logger.info(`Register attempt: ${email}`);

      // Validate
      const isValid = UserValidation(name, email, password, location);
      if (!isValid) return "Invalid user data";

      // Check existing user
      const existingUser = await UserRepo.findUserByEmail(email);
      if (existingUser) return "Email already exists";

      // Check provider
      const provider = await UserRepo.findProviderByLocation(location);
      if (!provider) return "No providers available in your location";

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create user
      const user = new User(name, email, hashedPassword, provider.location, provider.routing_number);

      // Insert into DB
     
      return await UserRepo.insertUser(user);

    } catch (error) {
      logger.error(`Error registering user: ${error.message}`);
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      logger.info(`Login attempt: ${email}`);
      const user = await UserRepo.findUserByEmail(email);
      if (!user) return "User not found";

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) return "Invalid password";

      logger.info(`Login successful: ${email}`);
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    } catch (error) {
      logger.error(`Error logging in: ${error.message}`);
      throw error;
    }
  }


  static async getAllUsers(){
    try {
      const users = await UserRepo.getAllUsers();
      console.log(users)
      return users;
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      throw error;  
    }
  }
  
}



