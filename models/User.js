import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor( name, email){
        this.id = uuidv4();
        this.name = name;
        this.email = email;     
    }

    createUser(){
        // Simulate saving to a database
        console.log(`User ${this.name} with email ${this.email} created.`);
    }

    updateUser(name, email){
        this.name = name || this.name;
        this.email = email || this.email;
        console.log(`User ${this.id} updated to name: ${this.name}, email: ${this.email}`);
    }

    deleteUser(){
        // Simulate deleting from a database
        console.log(`User ${this.id} deleted.`);
    }   



    toJSON(){   
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }       


}

