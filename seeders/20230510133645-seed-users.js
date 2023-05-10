'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = fs.readFileSync('./data/users.json','utf-8')
    data = JSON.parse(data)
    data.forEach(el =>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      delete el.id
    })
     await queryInterface.bulkInsert('Users', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
