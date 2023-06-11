require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect.js"); // db connection
const errorHandler = require("./middlewares/errorHandler.js");
const routeNotFound = require("./middlewares/routeNotFound.js");
const authenticate = require("./middlewares/authenticate.js");

const app = express();

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// rate limit prevent same IP to make to many request
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// middlewares
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// routes
const authRouter = require("./routes/auth.js");
const tasksRouter = require("./routes/tasks.js");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticate, tasksRouter);

app.use(routeNotFound); // route not found
app.use(errorHandler); // error handlers

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
