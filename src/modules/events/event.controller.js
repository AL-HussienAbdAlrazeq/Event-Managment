import { Event } from "../../../database/models/event.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const createEvent = catchError(async (req, res, next) => {
  const eventExist = await Event.findOne({ eventTitle: req.body.eventTitle });
  if (eventExist) {
    return next(new AppError("Event already exist"));
  }
  const event = await Event.insertMany(req.body);
  res.status(201).json({ message: "Success", event });
});

const findEvent = catchError(async (req, res, next) => {
  const event = await Event.find();
  res.status(201).json({ message: "Founded", event });
});

const findEventById = catchError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(201).json({ message: "Founded", event });
});

const updateEvent = catchError(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!event) {
    return next(new AppError("Event not found", 404));
  }
  res.status(200).json({ message: "Updated", event });
});

const deleteEvent = catchError(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id, req.body);
  if (!event) {
    return next(new AppError("Event not found", 404));
  }
  res.status(200).json({ message: "Deleted", event });

  // const event = await Event.findOneAndUpdate({_id:req.params.id , user:req.user.userId } , {isDeleted:true} , {new:true})// {},null
  // if(!event) return next(new appError("not allowed to delete  this Event",404))
  // res.status(200).json({message:"Deleted",event})
});

export { createEvent, findEvent, findEventById, updateEvent, deleteEvent };
