const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { Route, Review } = require('../model');

router.get('/routes',authenticateToken, async (req, res) => {
    try {
      const routes = await Route.findAll();
      res.render('routes', { routes });
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
  
    res.render('addRoute');
  });

router.post('/routes', async (req, res) => {
    const { difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType } = req.body;
    try {
      await Route.create({ difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType });
      res.redirect('/routes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating route');
    }
  });

  module.exports = router;