'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('Plant', {
    name: DataTypes.STRING,
    apiId: DataTypes.INTEGER,
    plantMethod: DataTypes.STRING,
    firstHarvestDate: DataTypes.STRING,
    lastHarvestDate: DataTypes.STRING,
    companionId: DataTypes.INTEGER
  }, {});
  Plant.associate = function(models) {
    Plant.belongsTo(models.Companion, {
      as: 'companion',
      foreignKey: 'companionId'
    })
  };
  return Plant;
};
