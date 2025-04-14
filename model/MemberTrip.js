import { DataTypes } from 'sequelize';

const MemberTripModel = (sequelize) => {
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

  const Trip = sequelize.models.Trip;

  MemberTrip.signUpToTrip = async function (memberId, tripId) {
    await this.create({
      Member_idMember: memberId,
      Trip_idTrip: tripId,
      hasVehicle: 0,
      freeSeats: 0,
    });
  };

  MemberTrip.withdrawFromTrip = async function (memberId, tripId) {
    await this.destroy({
      where: {
        Member_idMember: memberId,
        Trip_idTrip: tripId,
      },
    });
  };

  return MemberTrip;
};

export default MemberTripModel;