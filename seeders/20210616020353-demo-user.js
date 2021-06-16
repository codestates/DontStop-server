'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rankings', [{
      id:"3",
      user_id: '0',
      user_rank: '3',
      user_name: '이유림',
      user_time:'0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rankings', null, {});
  }
};

