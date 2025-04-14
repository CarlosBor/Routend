import { sequelize, MemberTrip } from '../model/index.js';

export const showTrips = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { previousRoutes, futureRoutes } = await sequelize.models.Trip.getTripsForUser(userId);
    
        const isAdmin = req.user.isAdmin === 1;
    
        res.render('trips', { futureRoutes, previousRoutes, isAdmin });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching trips');
      }
}

export const signUpToTrip = async (req, res) =>{
    const { tripId } = req.params;
    const userId = req.user.userId;
    await MemberTrip.signUpToTrip(userId, tripId)
    res.redirect('/trips');
}

export const withdrawFromTrip = async (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.userId;
    await MemberTrip.withdrawFromTrip(userId, tripId);
    res.redirect('/trips');
}