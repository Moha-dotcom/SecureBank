// import { User } from './User.js';
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import UserRepo from "./repository/UserRepo.js";


// UserRepo.findIfLocationExists("Alabama").then(console.log).catch(console.error);



UserRepo.registerUser("Mohamed Ismail", "BostonMas@gmail.com", "password123", "Arizona")
  .then(user => {
    console.log("Registered User:", user);
  })
  .catch(err => {
    console.error("Error registering user:", err);
  });



UserRepo.loginUser("BostonMas@gmail.com", "pasdssword123")
  .then(user => {
    console.log("Logged In User:", user);       
    })