'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      // User.hasMany(models.Favourite, {
      //   foreignKey: 'UserLikeId'
      // })
      User.hasMany(models.Post)
      User.belongsToMany(models.Post,{through:models.Favourite,foreignKey:'UserLikeId'})
    }


    static findByRole(role, Profile){
      if (role == 'admin') {
        return User.findAll({
          where: {role: {[Op.eq]: 'admin'}},
          include: {
            model: Profile,
            required: true
          },
          order: [['username', 'ASC']]
        })
      }
      if (role == 'user') {
        return User.findAll({
          where: {role: {[Op.eq]: 'user'}},
          include: {
            model: Profile,
            required: true
          },
          order: [['username', 'ASC']]
        })
      }

      return User.findAll({
        include: {
          model: Profile,
          required: true
        },
        order: [['username', 'ASC']]})

    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(instance,options)=>{
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};