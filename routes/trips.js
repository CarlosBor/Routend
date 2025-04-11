const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { sequelize, Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');
const app = express();

router.get('/trips', authenticateToken, async (req, res) => {
  try {
    // Fetch the future and past routes
    const userId = req.user.userId;
    const { previousRoutes, futureRoutes } = await sequelize.models.Trip.getTripsForUser(userId);

    // Check if the user is an admin
    const isAdmin = req.user.isAdmin === 1;

    // Render the trips view, passing futureRoutes, previousRoutes, and isAdmin
    res.render('trips', { futureRoutes, previousRoutes, isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching trips');
  }
});

router.get('/trips/:tripId/signup', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.userId;

  await MemberTrip.signUpToTrip(userId, tripId)

  res.redirect('/trips');
});

router.get('/trips/:tripId/withdraw', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.userId;

  await MemberTrip.withdrawFromTrip(userId, tripId);

  res.redirect('/trips');
});


  module.exports = router;