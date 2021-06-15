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
        allowNull : false,
      },
      user_rank: {
        type: Sequelize.INTEGER,
        referebces: { model: "user", key: "rank" },
        allowNull : false,
      },
      user_name : {
        type : Sequelize.STRING,
        referebces : { model : "user", key : "name"},
        allowNull : false,
      },
      user_time: {
        type: Sequelize.INTEGER,
        referebces: { model: "user", key: "time" },
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
    await queryInterface.dropTable('rankings');
  }
};