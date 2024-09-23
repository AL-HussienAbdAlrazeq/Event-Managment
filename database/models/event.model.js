import { model, Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventTitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizerName: { type: String, required: true , trim:true},
    availableSeats: {
      type: Number,
      required: true,
      min: [0, "No Available Seats"],
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: [0, "No Ticket Available"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Event = model("Event", eventSchema);
