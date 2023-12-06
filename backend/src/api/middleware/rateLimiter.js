const { rateLimit } = require("express-rate-limit");

//rate limiter request
const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 5,
  message: {
    succes: false,
    message: "Only 5 requests are allowed every 5 seconds",
  },
});

module.exports = limiter;
