import User from "../models/userModel.js";
import { BadRequestError, UnAuthorizedError } from "../errors.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("You must provide all the values");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("User with that email already exists");
  }

  const user = await User.create({ email, password });
  const token = user.createJWT();

  res.status(201).json({
    user: {
      email: user.email,
      _id: user._id,
    },
    token,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "You must provide an email and password to login"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("No user with that email");
  }

  const isPasswordOk = await user.comparePassword(password);
  if (!isPasswordOk) {
    throw new UnAuthorizedError("Wrong password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};
