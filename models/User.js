// // models/User.js
// import { v4 as uuidv4 } from "uuid";
// import { customAlphabet } from 'nanoid';

// export default class User {
//         #id;
//         // 10-digit numeric account number
//         #accountNumber;
      


//   constructor(name, email, password, location, routingNumber) {
//         this.#id = uuidv4();
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.location = location

//         const nanoid = customAlphabet('0123456789', 10);
//         this.#accountNumber = nanoid();
//         this.routingNumber = routingNumber // Static routing number for demonstration
//   }
//     // Getters
//     get id() { return this.#id; }
//     get name() { return this._name; }
//     get email() { return this._email; }
//     // get password() { return this._password; }
//     getAccountNum() { return this.#accountNumber; }
//     getRoutingNumber() { return this.routingNumber; }
    
//     // Setters
//     set name(value) { this._name = value; }
//     set email(value) { this._email = value; }
    
    


//     toJSON() {
//         return {
//         id: this.id,
//         name: this._name,
//         email: this._email
//             // accountNumber: this.accountNum   --- IGNORE ---  
//         };
//     }
// }


import { v4 as uuidv4 } from "uuid";
import { customAlphabet } from 'nanoid';

export default class User {
  #id;
  #accountNumber = "";

  constructor(name, email, password, location, routingNumber) {
    this.#id = uuidv4(); // <-- Generate per instance
    this.name = name;
    this.email = email;
    this.password = password;
    this.location = location;

    const nanoid = customAlphabet('0123456789', 10);
    this.#accountNumber = nanoid();
    this.routingNumber = routingNumber; // Static for demo
  }

  // Getters
  get id() { return this.#id; }
  get name() { return this._name; }
  get email() { return this._email; }
  getAccountNum() { return this.#accountNumber; }
  getRoutingNumber() { return this.routingNumber; }

  // Setters
  set name(value) { this._name = value; }
  set email(value) { this._email = value; }

  toJSON() {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      accountNumber: this.#accountNumber,
      routingNumber: this.routingNumber
    };
  }
}
