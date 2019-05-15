'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {});
  Plan.associate = function(models) {
    Plan.hasMany(models.Cell, {
      as: 'cells',
      foreignKey: 'planId'
    })
  };
  return Plan;
};
