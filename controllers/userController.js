import UserService from "../service/UserService.js";
import pino from "pino";

const logger = pino(
  { level: "info" },
  pino.transport({
    target: "pino-pretty",
    options: { colorize: true }
  })
);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const result = await UserService.registerUser(name, email, password, location);
    logger.info(`${result}`)
  
    

    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }

    logger.info(`Successfully registered user: ${email}`);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    

    logger.info(`Login result for ${email}: ${result} ` );

    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }

    return res.status(200).json({
      message: "Login successful",
      user: result
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllUsers = async (req, res) => {
    try {
        const Users = await UserService.getAllUsers();
        // console.log(Users)
        return res.status(200).json({
            users:  Users
        }); 
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}