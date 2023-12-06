const { todo_group, todo } = require("../../models");

class TodoService {
  static createTitle = async (title) => {
    const titleTodo = await todo_group.create(title);
    return titleTodo;
  };

  static createTodo = async (group, payload) => {
    const todoList = await todo.create({
      group_id: group,
      ...payload,
    });
    return todoList;
  };

  static getTodoByTitle = async (group) => {
    const validate = await todo_group.findOne({
      where: {
        id: group,
      },
    });

    if (!validate) throw new Error("notFound");

    const todoList = await todo.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        group_id: group,
      },
      include: [
        {
          model: todo_group,
          attributes: ["title"],
        },
      ],
    });
    return todoList;
  };

  static getAllTodo = async (pageNumber, pageSize) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const todoList = await todo_group.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: todo,
          attributes: { exclude: ["createdAt", "updatedAt", "group_id"] },
        },
      ],
      offset,
      limit,
    });
    return todoList;
  };

  static updateTodo = async (group, id, payload) => {
    const data = await todo.findOne({
      where: {
        group_id: group,
        id,
      },
    });

    if (!data) throw new Error("notFound");

    const todoList = await todo.update(payload, {
      where: {
        group_id: group,
        id,
      },
      attributes: { exclude: ["createdAt", "group_id"] },
    });
    return todoList;
  };

  static updateTitle = async (group, payload) => {
    const data = await todo_group.findOne({
      where: {
        id: group,
      },
    });

    if (!data) throw new Error("notFound");

    const titleTodo = await todo_group.update(payload, {
      where: {
        id: group,
      },
    });
    return titleTodo;
  };

  static deleteTodo = async (group, id) => {
    const data = await todo.findOne({
      where: {
        group_id: group,
        id,
      },
    });

    if (!data) throw new Error("notFound");

    const todoList = await todo.destroy({
      where: {
        group_id: group,
        id,
      },
    });
    return todoList;
  };

  static deleteGroupTodo = async (group) => {
    const data = await todo_group.findOne({
      where: {
        id: group,
      },
    });

    if (!data) throw new Error("notFound");

    const todoList = await todo.destroy({
      where: {
        group_id: group,
      },
    });

    const titleTodo = await todo_group.destroy({
      where: {
        id: group,
      },
    });
    return titleTodo, todoList;
  };
}

module.exports = TodoService;
