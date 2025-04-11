const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { sequelize, Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');
const app = express();

router.get('/trips',authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    try {
        const { previousRoutes, futureRoutes } = await sequelize.models.Trip.getTripsForUser(userId);
        res.render('trips', { previousRoutes, futureRoutes });
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