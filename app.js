
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import UserRepo from "./repositories/UserRepo.js";
import UserService from "./service/UserService.js"; 
import express from "express";
import bodyParser from "body-parser";

import userRoute from "./routes/UserRoute.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// UserRepo.findIfLocationExists("Alabama").then(console.log).catch(console.error);



// UserRepo.registerUser("AhmediKarmi  Karim", "Karim@gmail.com", "password123", "Arizona")
//   .then(user => {
//     console.log("Registered User:", user);
//   })
//   .catch(err => {
//     console.error("Error registering user:", err);
//   });



// UserRepo.loginUser("Karim@gmail.com", "passwssord123")
//   .then(user => {
//     console.log("Logged In User:", user);       
//     })