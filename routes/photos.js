const express = require('express');
const router = express.Router();
const { Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const authenticateToken = require('../middleware/authenticateToken');

// Display all photos for a specific trip
router.get('/photos/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
      const photos = await Photo.findAll({ where: { idTrip: tripId } });
      res.render('photos', { photos, tripId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching photos');
    }
  });
  
  // Add a new photo (form view)
  router.get('/photos/new/:tripId', (req, res) => {
    const { tripId } = req.params;
    res.render('addº1', { tripId });
  });
  
  // Handle new photo form submission
  router.post('/photos/:tripId', async (req, res) => {
    const { tripId } = req.params;
    const { url, idAuthor } = req.body;
  
    try {
      await Photos.create({ url, idAuthor, idTrip: tripId });
      res.redirect(`/photos/${tripId}`); // After successful addition, redirect to photos for the trip
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding photo');
    }
  });

module.exports = router;