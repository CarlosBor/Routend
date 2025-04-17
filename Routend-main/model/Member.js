import { DataTypes } from 'sequelize';

const Member = (sequelize) =>
  sequelize.define('Member', {
    idMember: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    firstAid: { type: DataTypes.TINYINT, allowNull: true },
  }, {
    tableName: 'Member',
    timestamps: false,
  });

export default Member;