'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const groups = await queryInterface.sequelize.query(
      'SELECT id from todo_groups;'
    );

    const groupRows = groups[0];

    await queryInterface.bulkInsert('todos', [
      {
        group_id: groupRows[0].id,
        name: 'Todo 1',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        group_id: groupRows[0].id,
        name: 'Todo 2',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        group_id: groupRows[0].id,
        name: 'Todo 3',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        group_id: groupRows[1].id,
        name: 'Todo 1',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        group_id: groupRows[1].id,
        name: 'Todo 2',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        group_id: groupRows[1].id,
        name: 'Todo 3',
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('todos', null, {});
  }
};
