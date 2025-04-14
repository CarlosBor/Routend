import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authenticateToken.js';
import { addRoute, displayRoutes } from '../controllers/routeController.js';
router.get('/routes',authenticateToken, async (req, res) => {
  displayRoutes(req,res);
  });
  
// router.get('/routes/new', authenticateToken, isAdmin, async (req, res) => {
//     const { tripId } = req.params;
//     const { review, idAuthor } = req.body;
  
//     try {
//       await Review.create({ review, idAuthor, idTrip: tripId });
//       res.redirect(`/reviews/${tripId}`);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error adding review');
//     }
  
//     res.render('addRoute');
//   });

router.post('/routes', async (req, res) => {
  addRoute(req, res);  
});

export default router;