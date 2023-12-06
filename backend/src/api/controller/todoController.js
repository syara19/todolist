const TodoService = require("../../service/todoService");
const { successResponse } = require("../../lib/response");
const logger = require("../../lib/logger");

class TodoController {
  static createTitle = async (req, res, next) => {
    try {
      await TodoService.createTitle(req.body);

      logger.info("Todo title created successfully");
      return res.status(201).json(
        successResponse({
          message: "Todo title created successfully",
        })
      );
    } catch (error) {
      logger.error(req.body);
      next(error);
    }
  };

  static createTodo = async (req, res, next) => {
    try {
      const { date } = req.body;
      if (typeof date === "number") throw new Error("date must be date");

      const data = await TodoService.createTodo(req.params.group, req.body);

      logger.info("Todo created successfully", { data });
      return res.status(201).json(
        successResponse({
          message: "Todo created successfully",
          data,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static getTodoByTitle = async (req, res, next) => {
    try {
      const data = await TodoService.getTodoByTitle(req.params.group);

      logger.info("get todo by title successfully", { data });
      return res.status(200).json(
        successResponse({
          message: "successfully",
          data,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static getAllTodo = async (req, res, next) => {
    try {
      const { pageNumber, pageSize } = req.body;

      const data = await TodoService.getAllTodo(pageNumber, pageSize);

      logger.info("get all todo successfully", { data });
      return res.status(200).json(
        successResponse({
          message: "successfully",
          data,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateTitle = async (req, res, next) => {
    try {
      await TodoService.updateTitle(req.params.group, req.body);

      logger.info("title updated succesfully");
      return res.status(200).json(
        successResponse({
          message: "title updated successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateTodo = async (req, res, next) => {
    try {
      const { group, id } = req.params;
      const { date } = req.body;
      if (typeof date === "number") throw new Error("date must be date");
      await TodoService.updateTodo(group, id, req.body);

      logger.info("todo updated successfully");
      return res.status(200).json(
        successResponse({
          message: "todo updated successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteTodo = async (req, res, next) => {
    try {
      const { group, id } = req.params;
      await TodoService.deleteTodo(group, id);

      logger.info("todo deleted successfully");
      return res.status(200).json(
        successResponse({
          message: "todo deleted successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteGroupTodo = async (req, res, next) => {
    try {
      const { group } = req.params;
      await TodoService.deleteGroupTodo(group);

      logger.info("todo deleted successfully");
      return res.status(200).json(
        successResponse({
          message: "todo deleted successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TodoController;
