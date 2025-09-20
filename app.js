
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import UserRepo from "./repositories/UserRepo.js";
import UserService from "./service/UserService.js"; 
import express from "express";
import bodyParser from "body-parser";

import userRoute from "./routes/UserRoute.js";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500', // allow your front-end origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



// // Middleware
// function AuthenticationMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Verify token (example with JWT)
//   const jwt = require("jsonwebtoken");
//   const SECRET_KEY = "mysecret123";

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });

//     req.user = user; // attach decoded user info
//     next(); // pass control to next handler (userRoute)
//   });
// }

// Enable JSON body parsing
app.use(express.json());

// Protect all /api/users routes
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
