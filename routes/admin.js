import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { users, addTripsForm, removeTrip, removeUser, promoteUser, addTrip } from '../controllers/adminController.js';
const router = express.Router();

router.get('/admin/users', authenticateToken, isAdmin, async (req, res) => {
    users(req, res);
  });
  
  router.get('/admin/trips/add', authenticateToken, isAdmin, async (req, res) => {
    addTripsForm(req, res);
  });

  router.post('/admin/trips/remove/:tripId', authenticateToken, isAdmin, async (req, res) => {
    removeTrip(req, res);
  });

  router.post('/admin/users/remove/:userId', authenticateToken, isAdmin, async (req, res) => {
    removeUser(req, res);
  });

  router.post('/admin/users/promote/:userId', authenticateToken, isAdmin, async (req, res) => {
    promoteUser(req, res);
  });

  router.post('/admin/trips/add', authenticateToken, isAdmin, async (req, res) => {
    addTrip(req, res);
  });

  export default router;