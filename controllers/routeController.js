import { Route } from '../model/index.js';

export const displayRoutes = async (req, res) => {
    try {
      const routes = await Route.findAll();
      res.render('routes', { routes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching routes');
    }
}

export const addRouteForm = async (req,res) => {
  const difficulties=["Easy", "Medium", "Hard"];
  const terrains= ["Rocky", "Sand", "Forest", "Trail", "Snow"];
  res.render("createRoute", { difficulties, terrains });
}
export const addRoute = async (req, res) => { 
    const { difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType } = req.body;
    try {
      await Route.create({ difficulty, location, meetingPoint:"default", distance, elevationGain, durationMins, terrainType });
      res.redirect('/routes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating route');
    }
}

export const editRouteForm = async (req, res) => {
  const difficulties=["Easy", "Medium", "Hard"];
  const terrains= ["Rocky", "Sand", "Forest", "Trail", "Snow"];
  const id = req.params.idRoute;
  const route = await Route.findByPk(id);
  if (!route) {
      res.redirect("/route")
  }
  res.render("routeEdit", { route, difficulties, terrains });
}

export const editRoute = async (req, res) => {
  const id = req.params.idRoute;
  const { location, durationMins, distance, difficulty, elevationGain, terrainType } = req.body;
  const route = await Route.findByPk(id);
  route.location = location;
  route.durationMins = parseInt(durationMins) || 0;
  route.elevationGain = elevationGain;
  route.distance = distance;
  route.difficulty = difficulty;
  route.terrainType = terrainType;
  try {
      await route.save();
  } catch (error) {
      console.error("Error al editar la ruta:", error);
      res.status(500).send("Error al editar la ruta");
  }
  
  res.redirect("/routes");
}

export const removeRoute = async (req, res) => {
  const id = req.params.idRoute;

  const route = await Route.findByPk(id);
  try {
      if (route) {
          await route.destroy();
      } else {
          console.log("No se pudo encontrar la ruta");
          res.redirect("/routes");
      }
  } catch (error) {
      console.error("Error al eliminar la ruta:", error);
      res.status(500).send("Error al eliminar la ruta");
  }
  res.redirect("/routes");
}