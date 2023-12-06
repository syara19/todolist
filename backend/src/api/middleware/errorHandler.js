const logger = require("../../lib/logger");

const errorHandler = (error, req, res, next) => {
  if (error.isJoi || error.message === "date must be date") {
    logger.error(error.message, req.body);
    return res.status(400).json({
      succes: false,
      message: error.message,
    });
  }

  if (error.message === "notFound") {
    logger.error("Data not found");
    return res.status(404).json({
      succes: false,
      message: "Data not found",
    });
  }
  logger.error(error.message || "Internal Server Error");
  return res.status(500).json({
    succes: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
