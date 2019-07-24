'use strict';
module.exports = (sequelize, DataTypes) => {
  const Companion = sequelize.define('Companion', {
    familyName: DataTypes.STRING,
    note: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {});
  Companion.associate = function(models) {
    Companion.hasMany(models.Plant,{
      as: 'plants',
      foreignKey: 'companionId'
    })
  };
  return Companion;
};
