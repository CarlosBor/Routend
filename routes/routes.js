const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');

// Display all routes
router.get('/routes',authenticateToken, async (req, res) => {
    //TODOEn caso admin, poder añadir/quitar
    try {
      const routes = await Route.findAll(); // Get all routes from DB
      res.render('routes', { routes }); // Pass routes to the 'routes.pug' view
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching routes');
    }
  });
  
router.get('/routes/new', authenticateToken, isAdmin, async (req, res) => {
    const { tripId } = req.params;
    const { review, idAuthor } = req.body;
  
    try {
      await Review.create({ review, idAuthor, idTrip: tripId });
      res.redirect(`/reviews/${tripId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding review');
    }
  
    res.render('addRoute'); // Render the 'addRoute.pug' view for adding new routes
  });

  // Handle new route form submission
router.post('/routes', async (req, res) => {
    const { difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType } = req.body;
    try {
      await Route.create({ difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType });
      res.redirect('/routes'); // After successful addition, redirect to routes list
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating route');
    }
  });

  module.exports = router;