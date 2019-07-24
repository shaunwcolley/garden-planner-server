'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cell = sequelize.define('Cell', {
    planId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER,
    cellNum: DataTypes.INTEGER
  }, {});
  Cell.associate = function(models) {
    Cell.belongsTo(models.Plan, {
      as: 'plan',
      foreignKey: 'planId'
    })
    Cell.belongsTo(models.Plant, {
      as: 'plant',
      foreignKey: 'plantId'
    })
  };
  return Cell;
};
