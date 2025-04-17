import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import { showTrips, signUpToTrip, withdrawFromTrip } from '../controllers/tripController.js';

router.get('/trips', authenticateToken, async (req, res) => {
  showTrips(req, res);
});

router.get('/trips/:tripId/signup', authenticateToken, async (req, res) => {
  signUpToTrip(req, res);
});

router.get('/trips/:tripId/withdraw', authenticateToken, async (req, res) => {
  withdrawFromTrip(req, res);
});


export default router;