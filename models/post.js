'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post.init({
    id:{
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};