'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rankings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        referebces: { model: "user", key: "id" },
      },
      user_time: {
        type: Sequelize.DATE,
        referebces: { model: "user", key: "time" },
      },
      user_rank: {
        type: Sequelize.INTEGER,
        referebces: { model: "user", key: "rank" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rankings');
  }
};