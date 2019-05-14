'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      apiId: {
        type: Sequelize.INTEGER
      },
      plantMethod: {
        type: Sequelize.STRING
      },
      firstHarvestDate: {
        type: Sequelize.STRING
      },
      lastHarvestDate: {
        type: Sequelize.STRING
      },
      companionId: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Plants');
  }
};