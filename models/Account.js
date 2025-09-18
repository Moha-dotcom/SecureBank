

class Account {
    constructor(id, name, email) {  
        this.id = id;
        this.name = name;
        this.email = email;     
    }
    
    toJSON(){   
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }

    
}