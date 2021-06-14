'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ranking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ranking.init({
    id:{
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    user_time: DataTypes.DATE,
    user_rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ranking',
  });
  return ranking;
};