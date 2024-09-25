import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { User } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";


const signup = catchError(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  let token = jwt.sign(
    { userId: user._id},  
    process.env.SECRET_KEY
  );
  res.status(201).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect email or password ", 401));

  jwt.sign(
    { userId: user.id, username: user.username },
    process.env.SECRET_KEY,
    (err, token) => {
      res.status(201).json({ message: "login", token });
    }
  );
});



const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("Token Not Provided", 401));
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("User Not Found", 404));
  req.user = user;
  next();
});




export {
  signup,
  signin,
  protectedRoutes,
};
