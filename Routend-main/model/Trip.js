import { DataTypes } from 'sequelize';

const Trip = (sequelize) => {
  const Trip = sequelize.define('Trip', {
    idTrip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Time: { type: DataTypes.DATE, allowNull: false },
    idGuide: { type: DataTypes.INTEGER, allowNull: false },
    idRoute: { type: DataTypes.INTEGER, allowNull: false },
    weather: {
      type: DataTypes.ENUM('Cloudy', 'Sunny', 'Rainy', 'Windy', 'Snowy', 'Unknown'),
      allowNull: false,
    },
  }, {
    tableName: 'Trip',
    timestamps: false,
  });

  Trip.getTripsForUser = async function (userId) {
    const [routes, trips, userTrips] = await Promise.all([
      sequelize.models.Route.findAll(),
      this.findAll(),
      sequelize.models.MemberTrip.findAll({ where: { Member_idMember: userId } }),
    ]);

    const attendedTripIds = new Set(userTrips.map(entry => entry.get().Trip_idTrip));
    const enhanceTrips = (tripList) => tripList.map(trip => ({
      ...trip.get(),
      attended: attendedTripIds.has(trip.idTrip),
    }));

    const now = Date.now();
    const previousRoutes = routes.map(route => {
      const tripsForRoute = trips.filter(trip => {
        const tripTime = new Date(trip.Time).getTime();
        return trip.idRoute === route.idRoute && tripTime < now;
      });
      return {
        route,
        trips: enhanceTrips(tripsForRoute),
      };
    });

    const futureRoutes = routes.map(route => {
      const tripsForRoute = trips.filter(trip => {
        const tripTime = new Date(trip.Time).getTime();
        return trip.idRoute === route.idRoute && tripTime > now;
      });
      return {
        route,
        trips: enhanceTrips(tripsForRoute),
      };
    });
    return { previousRoutes, futureRoutes };
  };

  return Trip;
};

export default Trip;