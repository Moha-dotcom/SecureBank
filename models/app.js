import { User } from './User.js';


const newUser = new User("Alice", "aliceCompany@gmail.com")
newUser.createUser()
newUser.toJSON()
// newUser.updateUser("Alice Cooper", "cooper@company.com")