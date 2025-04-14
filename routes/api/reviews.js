const authenticateToken = require('../../middleware/authenticateToken');
const express = require('express');
const router = express.Router();
const { Review } = require('../../model');

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

module.exports = router;
