const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Trip', {
    idTrip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Time: { type: DataTypes.DATE, allowNull: false },
    idGuide: { type: DataTypes.INTEGER, allowNull: false }, // assumed no FK in schema
    idRoute: { type: DataTypes.INTEGER, allowNull: false },
    weather: {
      type: DataTypes.ENUM('Cloudy', 'Sunny', 'Rainy', 'Windy', 'Snowy', 'Unknown'),
      allowNull: false,
    },
  }, {
    tableName: 'Trip',
    timestamps: false,
  });
