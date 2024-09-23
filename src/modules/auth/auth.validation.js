  
import Joi from "joi"

const signUpValidate =  Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password'),
  })

  const signInValidate =  Joi.object({
    email:Joi.string().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password').required(),
  })


  export{
    signUpValidate,
    signInValidate
  }