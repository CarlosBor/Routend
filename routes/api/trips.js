const express = require('express');
const router = express.Router();
const { Trip, Route } = require('../../model');

router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.findAll({ include: Route });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

module.exports = router;