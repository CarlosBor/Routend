// models/MemberTrip.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MemberTrip = sequelize.define('MemberTrip', {
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

  // Add helper functions directly to the model (optional)
  MemberTrip.signUpToTrip = async function (memberId, tripId) {
    await this.create({
      Member_idMember: memberId,
      Trip_idTrip: tripId,
      hasVehicle: 0,
      freeSeats: 0,
    });
  };

  MemberTrip.withdrawFromTrip = async function (memberId, tripId) {
    console.log("Withdraw");
    console.log("member: ", memberId);
    console.log("trip: ", tripId);

    await this.destroy({
      where: {
        Member_idMember: memberId,
        Trip_idTrip: tripId,
      },
    });
  };

  return MemberTrip;
};