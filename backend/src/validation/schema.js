const BaseJoi = require("@hapi/joi");
const Extension = require("@hapi/joi-date");
const Joi = BaseJoi.extend(Extension);

const validateTodo = Joi.object({
  name: Joi.string().required().max(255),
  date: Joi.date().format("YYYY-MM-DD HH:mm").default(null),
  isCompleted: Joi.boolean().default(false),
});

const editTodo = Joi.object({
  name: Joi.string().max(255),
  date: Joi.date().format("YYYY-MM-DD HH:mm").default(null),
  isCompleted: Joi.boolean().default(false),
});

const validateTitle = Joi.object({
  title: Joi.string().required().max(255),
});

module.exports = { validateTitle,editTodo, validateTodo };
