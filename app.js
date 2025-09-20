
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


app.use(express.json());

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
