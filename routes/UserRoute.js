// routes/userRoutes.js
import express from "express";
import UserService from "../service/UserService.js";
import pino from "pino";

const logger = pino(
  { level: "info" },
  pino.transport({
    target: "pino-pretty",
    options: { colorize: true }
  })
);

const userRoutes = express.Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @body { name, email, password, location }
 */
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const result = await UserService.registerUser(name, email, password, location);
    logger.info(`Registration result for ${email}: ${result}`);

    if (typeof result === "string") {
      // Validation or business logic error
      return res.status(400).json({ message: result });
    }

    logger.info(`Successfully registered user: ${email}`);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route POST /api/users/login
 * @desc Login a user
 * @body { email, password }
 */
userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await UserService.loginUser(email, password);
    logger.info(`Login result for ${email}: ${result}`);

    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default userRoutes;
