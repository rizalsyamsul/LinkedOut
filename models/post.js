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
    get formatUpdatedDate(){
      let stats;
      if(this.createdAt.getDate() === this.updatedAt.getDate()){
        stats = 'Created'
      }else{
        stats = 'Updated'
      }

      console.log(this.createdAt === this.updatedAt)

      const diff = new Date() - this.updatedAt

      const second = 1000
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;

      let delay;

      if(diff < minute){
          delay = Math.floor(diff/second);
          return `${stats} ${delay} Seconds Ago`
      }else if(diff < hour){
          delay = Math.floor(diff/minute);
          return `${stats} ${delay} Minutes Ago`
      }else if(diff < day){
          delay = Math.floor(diff/hour);
          return `${stats} ${delay} Hours Ago`
      }else{
          delay = Math.floor(diff/day)
          return `${stats} ${delay} Days Ago`
      }
    }

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