const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { sequelize, Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');

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

  module.exports = router;