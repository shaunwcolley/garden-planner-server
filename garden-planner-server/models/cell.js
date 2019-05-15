'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cell = sequelize.define('Cell', {
    planId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER,
    cellNum: DataTypes.INTEGER
  }, {});
  Cell.associate = function(models) {
    // associations can be defined here
  };
  return Cell;
};