import express from 'express';
const router = express.Router();
import { Route } from '../../model/index.js';

router.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.findAll({});
    res.json(routes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

export default router;