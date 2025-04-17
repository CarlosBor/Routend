import express from 'express';
const router = express.Router();
import { login, signup, logout} from '../controllers/authController.js';

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/login', async (req, res) => {
    login(req, res);
  }
);

router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
router.post('/signup', async (req, res) => {
  signup(req, res);
});

router.get('/unauthorized', (req, res) => {
  res.render('unauthorized');
});

router.get('/logout', (req, res) => {
  logout(req, res);
})
export default router;