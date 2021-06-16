'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rankings', [{
      id:"2",
      user_id: '0',
      user_rank: '2',
      user_name: '나원빈',
      user_time:'0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rankings', null, {});
  }
};

