const validateRequest = require("../../validation");
const { validateTitle, validateTodo, editTodo } = require("../../validation/schema");
const TodoController = require("../controller/todoController");

const router = require("express").Router();

//api route
router.post("/", validateRequest(validateTitle), TodoController.createTitle);
router.post(
  "/:group",
  validateRequest(validateTodo),
  TodoController.createTodo
);
router.get("/:group", TodoController.getTodoByTitle);
router.get("/", TodoController.getAllTodo);
router.put(
  "/:group",
  validateRequest(validateTitle),
  TodoController.updateTitle
);
router.put(
  "/:group/:id",
  validateRequest(editTodo),
  TodoController.updateTodo
);
router.delete("/:group/:id", TodoController.deleteTodo);
router.delete("/:group", TodoController.deleteGroupTodo);

module.exports = router;
