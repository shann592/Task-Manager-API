const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (error, req, res, next) => {
  let customError = {
    statusCode: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong!",
  };
  // cast errors
  if (error.name === "CastError") {
    customError.msg = `No item found for ${error.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // duplicate value errors
  if (error.code && error.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value.`;
  }

  // validation errors

  if (error.name === "ValidationError") {
    customError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
