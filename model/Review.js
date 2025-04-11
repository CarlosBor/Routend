const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Review', {
    idReview: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idAuthor: { type: DataTypes.INTEGER, allowNull: false },
    idTrip: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.STRING(1000), allowNull: false },
  }, {
    tableName: 'Reviews',
    timestamps: false,
  });
