'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('studyPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        referebces: { model: "user", key: "id" },
        allowNull : false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        referebces: { model: "groups", key: "id" },
        allowNull : false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      contents: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      count: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('studyPosts');
  }
};