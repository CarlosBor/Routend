import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import isAdmin from '../middleware/isAdmin.js';
import Route from '../model/Route.js';
import { addRoute, displayRoutes, addRouteForm, editRoute, editRouteForm, removeRoute } from '../controllers/routeController.js';
router.get('/routes',authenticateToken, async (req, res) => {
  displayRoutes(req,res);
  });
  
  router.get('/routes/new', authenticateToken, isAdmin, async (req, res) => {
    addRouteForm(req, res);
  });

router.post('/routeAdd', async (req, res) => {
  addRoute(req, res);
  });

router.post('/routes', async (req, res) => {
  addRoute(req, res);  
});

router.get('/routes/edit/:idRoute',authenticateToken, isAdmin, async (req, res) => {
  editRouteForm(req,res);
  });

router.post('/routes/edit/:idRoute',authenticateToken, isAdmin, async (req, res) => {
  editRoute(req,res);
});

router.post('/routes/delete/:idRoute',authenticateToken, isAdmin, async (req, res) => {
  removeRoute(req,res);
});

export default router;