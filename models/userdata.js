'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userData.init({
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userData',
  });
  return userData;
};