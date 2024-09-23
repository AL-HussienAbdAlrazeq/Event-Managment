import Joi from "joi";

export const createEventValidation = Joi.object({
  eventTitle: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  organizerName: Joi.string().min(3).max(100).required(),
  availableSeats: Joi.number().min(0).required(),
  ticketPrice: Joi.number().min(0).required(),
});

export const updateEventValidation = Joi.object({
  eventTitle: Joi.string().min(5).max(200),
  description: Joi.string().min(10).max(1000),
  date: Joi.date(),
  location: Joi.string(),
  organizerName: Joi.string().min(3).max(100),
  availableSeats: Joi.number().min(0),
  ticketPrice: Joi.number().min(0),
  id: Joi.string().hex().length(24).required(),
});
