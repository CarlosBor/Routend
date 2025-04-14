import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import isAdmin from '../middleware/isAdmin.js';
import { Route, Review } from '../model/index.js';

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

export default router;