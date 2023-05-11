'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      // Post.hasMany(models.Favourite)
      Post.belongsToMany(models.User, { through: models.Favourite, foreignKey: 'PostId' })
    }
  }
  Post.init({
    title: {
      type: DataTypes.TEXT,
      validate:
      {
        notEmpty:{
          msg: `Title is Required`
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate:
      {
        notEmpty:{
          msg: `Content is Required`
        }
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      validate:
      {
        notEmpty:{
          msg: `Image is Required`
        },
        isFilenameEmpty(value){
          if (!value) {
            throw new Error('filename is require')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};