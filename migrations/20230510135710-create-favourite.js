'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserLikeId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName : 'Users'
          },
          key: 'id'
      },
      onDelete:'cascade',
      onUpdate:'cascade'

      },
      PostId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName : 'Posts'
          },
          key: 'id'
      },
      onDelete:'cascade',
      onUpdate:'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favourites');
  }
};