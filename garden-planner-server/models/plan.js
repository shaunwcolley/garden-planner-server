'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Plan.associate = function(models) {
    // associations can be defined here
  };
  return Plan;
};