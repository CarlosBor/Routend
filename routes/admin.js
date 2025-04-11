const express = require('express');
const router = express.Router();
const { Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/admin/users', authenticateToken, isAdmin, async (req, res) => {
    try {
      const users = await Member.findAll();
      res.render('adminUsers', { users });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    }
  });
  
  // Route to remove a user
  router.post('/admin/users/remove/:userId', authenticateToken, isAdmin, async (req, res) => {
    const { userId } = req.params;
    try {
      await Member.destroy({
        where: {
          idMember: userId
        }
      });
      res.redirect('/admin/users');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing user');
    }
  });
  
  // Route to make a user an admin
  router.post('/admin/users/promote/:userId', authenticateToken, isAdmin, async (req, res) => {
    const { userId } = req.params;
    try {
      await Member.update(
        { isAdmin: 1 },
        { where: { idMember: userId } }
      );
      res.redirect('/admin/users');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error promoting user');
    }
  });

  router.get('/admin/trips/add', authenticateToken, isAdmin, async (req, res) => {
    try {
      const routes = await Route.findAll();
      const admins = await Member.findAll({
        where: { isAdmin: 1 }
      });
  
      res.render('addTrip', { routes, admins });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching routes or admins');
    }
  });

  router.post('/admin/trips/add', authenticateToken, isAdmin, async (req, res) => {
    const { route, guide, date, weather } = req.body;
  
    try {
      // Insert the new trip into the database
      const newTrip = await Trip.create({
        Time: date,
        idGuide: guide,
        idRoute: route,
        weather: weather
      });
  
      // Redirect to the trips list or a success page
      res.redirect('/trips');  // Adjust as needed for your setup
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding the trip');
    }
  });

  router.post('/admin/trips/remove/:tripId', authenticateToken, isAdmin, async (req, res) => {
    const { tripId } = req.params;
  
    try {
      // Delete the trip
      await Trip.destroy({
        where: {
          idTrip: tripId
        }
      });
  
      // Redirect to trips page or show success message
      res.redirect('/trips');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing the trip');
    }
  });
  

  
module.exports = router;