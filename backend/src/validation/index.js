const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) return next(result.error);

    next();
  };
};

module.exports = validateRequest;
