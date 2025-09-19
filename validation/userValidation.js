import Joi from 'joi';


export default function UserValidation(name, email, password, location) {
      const scheme = Joi.object({
            name: Joi.string().min(3).max(30).required().messages({
                'string.base': `"name" should be a type of 'text'`,
                'string.empty': `"name" cannot be an empty field`,
                'string.min': `"name" should have a minimum length of {#limit}`,
                'string.max': `"name" should have a maximum length of {#limit}`,
                'any.required': `"name" is a required field`
            }),
            password: Joi.string().min(6).required().messages({
                'string.base': `"password" should be a type of 'text'`,
                'string.empty': `"password" cannot be an empty field`,
                'string.min': `"password" should have a minimum length of {#limit}`,
                'any.required': `"password" is a required field`
            }).alphanum(),
            email: Joi.string().email().required().messages({
                'string.base': `"email" should be a type of 'text'`,
                'string.email': `"email" must be a valid email`,
                'string.empty': `"email" cannot be an empty field`,
                'any.required': `"email" is a required field`
            }),
            location: Joi.string().min(5).max(30).messages({
                'string.base': `"location" should be a type of 'text'`,
                'string.empty': `"location" cannot be an empty field`,
                'string.min': `"location" should have a minimum length of {#limit}`,
                'string.max': `"location" should have a maximum length of {#limit}`,
            })
        });

        const {error} = scheme.validate({ name,password,   email }); 
        if(error){
              return false
        }
      

        return true;
}