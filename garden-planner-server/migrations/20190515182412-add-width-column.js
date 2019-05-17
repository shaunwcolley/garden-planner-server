'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Plans',
      'width', {
        type: Sequelize.INTEGER
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Plans',
      'width'
    )
  }
};
