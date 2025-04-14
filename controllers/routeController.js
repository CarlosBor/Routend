import { Route, Review } from '../model/index.js';

export const displayRoutes = async (req, res) => {
    try {
      const routes = await Route.findAll();
      res.render('routes', { routes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching routes');
    }
}

export const addRoute = async (req, res) => {
    const { difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType } = req.body;
    try {
      await Route.create({ difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType });
      res.redirect('/routes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating route');
    }
}