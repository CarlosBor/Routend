import express from 'express';
const router = express.Router();
import { Trip, Route } from '../../model/index.js';
router.get('/api/trips', async (req, res) => {
  try {
    const trips = await Trip.findAll({ include: Route });
    res.json(trips);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

export default router;