'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rankings', [{
      id:"2",
      user_id: '2',
      user_rank: '2',
      user_name: 'b',
      user_time:'2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rankings', null, {});
  }
};

