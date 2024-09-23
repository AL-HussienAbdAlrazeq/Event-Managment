import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email:{type:String , required:true},
  password:{type:String , required:true}
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const User = mongoose.model("User", userSchema);

