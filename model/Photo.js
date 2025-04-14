import { DataTypes } from 'sequelize';

const Photo = (sequelize) =>
  sequelize.define('Photo', {
    idPhotos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: { type: DataTypes.STRING, allowNull: true },
    idAuthor: { type: DataTypes.INTEGER, allowNull: false },
    idTrip: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'Photos',
    timestamps: false,
  });

export default Photo;