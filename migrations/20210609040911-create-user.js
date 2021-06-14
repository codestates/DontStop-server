'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      time: {
        type: Sequelize.DATE,
        allowNull : false,
      },
      rank: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        referebces: { model: "groups", key: "id" },
        allowNull : false,
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
    await queryInterface.dropTable('users');
  }
};