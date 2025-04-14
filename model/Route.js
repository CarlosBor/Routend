import { DataTypes } from 'sequelize';

const Route = (sequelize) =>
  sequelize.define('Route', {
    idRoute: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    difficulty: {
      type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
      allowNull: false,
    },
    location: { type: DataTypes.STRING, allowNull: false },
    meetingPoint: { type: DataTypes.STRING, allowNull: false },
    distance: { type: DataTypes.STRING, allowNull: false },
    elevationGain: { type: DataTypes.STRING, allowNull: false },
    durationMins: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    terrainType: {
      type: DataTypes.ENUM('Rocky', 'Sand', 'Forest', 'Trail', 'Snow'),
      allowNull: false,
    },
  }, {
    tableName: 'Route',
    timestamps: false,
  });

  export default Route;