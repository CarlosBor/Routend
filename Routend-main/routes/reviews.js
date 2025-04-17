import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import { addReview, displayReviews } from '../controllers/reviewController.js';

router.get('/reviews/:tripId', async (req, res) => {
  displayReviews(req, res);
});
  
  router.get('/reviews/new/:tripId', authenticateToken, (req, res) => {
    const { userId } = req.user;
    const { tripId } = req.params;
    res.render('addReview', { tripId, userId });
  });
  
  router.post('/reviews/:tripId', authenticateToken, async (req, res) => {
    addReview(req, res);
  });

  export default router;