import express from 'express'
const router = express.Router();
import { Photo } from '../model/index.js';
import authenticateToken from '../middleware/authenticateToken.js';

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
  
  router.get('/photos/new/:tripId', (req, res) => {
    const { tripId } = req.params;
    res.render('addPhoto', { tripId });
  });
  
  router.post('/photos/:tripId', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const { url } = req.body;
    const { userId } = req.user;
    try {
      await Photo.create({ url, idAuthor:userId, idTrip: tripId });
      res.redirect(`/photos/${tripId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding photo');
    }
  });

export default router;