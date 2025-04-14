import { Member, Review } from '../model/index.js';

export const displayReviews = async (req, res) => {
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
}

export const addReview = async (req, res) => {
    const { tripId } = req.params;
    const { review } = req.body;
    const { userId } = req.user;
    try {
      await Review.create({ review, idAuthor:userId, idTrip: tripId });
      res.redirect(`/reviews/${tripId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding review');
    }
}