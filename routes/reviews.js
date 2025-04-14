import express from 'express';
const router = express.Router();
import { Member, Review } from '../model/index.js';
import authenticateToken from '../middleware/authenticateToken.js';

router.get('/reviews/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
      const reviews = await Review.findAll({ where: { idTrip: tripId } });
      const namedReviews = await Promise.all(
        reviews.map(async (review) => {
          const member = await Member.findOne({ where: {idMember: review.idAuthor}});
          const username = member ? member.get('username') : 'Unknown';
          return {
            ...review.get(),
            username
          };
       }));
      res.render('reviews', { namedReviews, tripId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching reviews');
    }
  });
  
  router.get('/reviews/new/:tripId', authenticateToken, (req, res) => {
    const { userId } = req.user;
    const { tripId } = req.params;
    res.render('addReview', { tripId, userId });
  });
  
  router.post('/reviews/:tripId', authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { tripId } = req.params;
    const { review } = req.body;
    try {
      await Review.create({ review, idAuthor:userId, idTrip: tripId });
      res.redirect(`/reviews/${tripId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding review');
    }
  });

  export default router;