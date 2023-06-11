const { BadRequest, Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// const validatePassword = require("../utils/validatePassword");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email or password.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid Credentials");
  }
  const isPasswordCorrect = await user.validatePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
};

exports.register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
};
