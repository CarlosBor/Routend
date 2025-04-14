const express = require('express');
const router = express.Router();
const { Member, Route, Trip } = require('../model');
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

  router.post('/admin/trips/remove/:tripId', authenticateToken, isAdmin, async (req, res) => {
    const { tripId } = req.params;
    try {
      await Trip.destroy({
        where: {
          idTrip: tripId
        }
      });
      res.redirect('/trips');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing the trip');
    }
  });

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

  router.post('/admin/trips/add', authenticateToken, isAdmin, async (req, res) => {
    const { route, guide, date, weather } = req.body;
    try {
      const newTrip = await Trip.create({
        Time: date,
        idGuide: guide,
        idRoute: route,
        weather: weather
      });
      res.redirect('/trips');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding the trip');
    }
  });

module.exports = router;