// import { User } from './User.js';
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import UserRepo from "./repository/UserRepo.js";
// import User from "./models/User.js";

// const UserModel = new User();

// UserModel.createUser('Alice', 'Muhaz4@"example.com', 'securePassword123');
// console.log(UserModel.createUser('AhmedIsmail','Mohamed99292',  'AhmedIsmail@gmail.com' ));

// console.log(await UserModel.findUserByEmail("Mohamedsahal612@gmail.com"));

// console.log(await UserModel.loginUser("AhmedIsmail@gmail.com", "Mohamed992kakfk92"))


// UserRepo.registerUser('Alice', 'AliceMohamed@gmail.com','securePassword123' ).then((res) => console.log(res));
UserRepo.registerUser('Alice', 'AliceMohmail.com','securePassord123' ).then((res) => console.log(res));