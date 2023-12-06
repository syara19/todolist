'use strict';
const todo = require('./todo');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo_group.hasMany(models.todo, { foreignKey: 'group_id' });
    }
  }
  todo_group.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todo_group',
  });
  // todo_group.hasMany(todo, { foreignKey: 'group_id' });
  return todo_group;
};
