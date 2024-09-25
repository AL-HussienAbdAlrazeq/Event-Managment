import { Router } from "express";
import { createEvent, deleteEvent, findEvent, findEventById, updateEvent } from "./event.controller.js";
import { validate } from "../../middleware/validate.js";
import { createEventValidation, updateEventValidation } from "./event.validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";


const eventRouter = Router()

eventRouter.post('/' ,protectedRoutes ,validate(createEventValidation),createEvent)
eventRouter.get('/' , protectedRoutes ,findEvent)
eventRouter.get('/:id' ,protectedRoutes , findEventById)
eventRouter.put('/:id' , protectedRoutes ,validate(updateEventValidation),updateEvent)
eventRouter.delete('/:id',protectedRoutes , deleteEvent)

  

export default eventRouter