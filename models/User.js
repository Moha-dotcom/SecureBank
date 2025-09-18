// models/User.js
import { v4 as uuidv4 } from "uuid";

export default class User {
  #id = uuidv4();
  name = "";
  email = "";
  password = "";

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}
