'use strict';
const todo_group = require('./todo_group');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.todo_group, { foreignKey: 'group_id' });
    }
  }
  todo.init({
    group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};


