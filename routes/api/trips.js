import express from 'express';
const router = express.Router();
import Trip from '../../model/Trip.js';
import Route from '../../model/Route.js';

router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.findAll({ include: Route });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

export default router;