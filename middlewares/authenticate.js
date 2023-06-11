const { CustomError, Unauthenticated } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthenticated("No token found");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new Unauthenticated("Not authorised to access the route");
  }
};

module.exports = authenticate;
