const express = require("express");
const cors = require("cors");
const todoRoute = require("./api/route/todoRoute");
const errorHandler = require("./api/middleware/errorHandler");
const limiter = require("./api/middleware/rateLimiter");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") app.use(limiter);

//routes
app.use("/api/todos", todoRoute);
app.use(errorHandler);

module.exports = app;
