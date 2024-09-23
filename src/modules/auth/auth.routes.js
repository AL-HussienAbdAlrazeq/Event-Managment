import { Router } from "express"

import { signin, signup } from "./auth.controller.js"
import { signInValidate, signUpValidate } from "./auth.validation.js"
import { checkEmail } from "../../middleware/checkEmail.js"
import { validate } from "../../middleware/validate.js"



 const authRouter = Router()

authRouter.post('/signup' ,validate(signUpValidate) ,checkEmail, signup)
authRouter.post('/signin' , validate(signInValidate), signin)


export default authRouter

 