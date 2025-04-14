import express from 'express'
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import { addPhoto, displayPhotos } from '../controllers/photoController.js';

router.get('/photos/:tripId', async (req, res) => {
    displayPhotos(req, res);
  });
  
  router.get('/photos/new/:tripId', (req, res) => {
    const { tripId } = req.params;
    res.render('addPhoto', { tripId });
  });
  
  router.post('/photos/:tripId', authenticateToken, async (req, res) => {
    addPhoto(req, res);
  });

export default router;