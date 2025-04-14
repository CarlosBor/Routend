import authenticateToken from '../../middleware/authenticateToken.js';
import Review from '../../model/Review.js';
import express from 'express';

const router = express.Router();

router.post('/reviews', authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { tripId, review } = req.body;

  try {
    const newReview = await Review.create({
      review,
      idAuthor: userId,
      idTrip: tripId
    });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
