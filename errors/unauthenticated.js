const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class Unauthenticated extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
