'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rankings', [{
      id:"3",
      user_id: '3',
      user_rank: '3',
      user_name: 'c',
      user_time:'3',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rankings', null, {});
  }
};

