'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    get jobCompany(){
      return `${this.job} in ${this.company}`
    }
  }
  Profile.init({
    fullName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Name is required`
        }
      }
    },
    location: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Location is required`
        }
      }
    },
    job: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Job is required`
        }
      }
    },
    company: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Company is required`
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg: `UserId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};