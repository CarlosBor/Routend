const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('MemberTrip', {
    Member_idMember: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Trip_idTrip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    hasVehicle: { type: DataTypes.TINYINT, allowNull: false },
    freeSeats: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  }, {
    tableName: 'Member_has_Trip',
    timestamps: false,
  });
