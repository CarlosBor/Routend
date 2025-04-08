const express = require('express');
const router = express.Router();
const { Member, Route, Photo, Review } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Middleware:
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();  // Proceed to the next middleware or route handler
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  // Look for the token in cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Store decoded user data (userId, isAdmin) in the request object
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  });
};
//Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const member = await Member.findOne({ where: { username } });
    if (!member) {
      return res.status(401).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const payload = { userId: member.idMember, isAdmin: member.isAdmin };  // Store user info in the token payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour
    res.redirect('/routes'); // You can change '/home' to any route you'd like
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//Register
router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
router.post('/signup', async (req, res) => {
  const { name, username, password, confirmPassword, firstAid } = req.body;

  // Validate password confirmation
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Check if username already exists
    const existingUser = await Member.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new member
    const newMember = await Member.create({
      name,
      username,
      password:hashedPassword, // you should hash this password before storing it, but for now we leave it plain
      isAdmin: 0, // set default admin status to non-admin
      firstAid, // set default first aid status to 0
    });

    res.send(`Account created for ${newMember.name}!`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
  
// Display all routes
router.get('/routes',authenticateToken, async (req, res) => {
  try {
    const routes = await Route.findAll(); // Get all routes from DB
    res.render('routes', { routes }); // Pass routes to the 'routes.pug' view
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching routes');
  }
});

// Add a new route (form view)
router.get('/routes/new', authenticateToken, isAdmin, async (req, res) => {
  const { tripId } = req.params;
  const { review, idAuthor } = req.body;

  try {
    await Review.create({ review, idAuthor, idTrip: tripId });
    res.redirect(`/reviews/${tripId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding review');
  }

  res.render('addRoute'); // Render the 'addRoute.pug' view for adding new routes
});

// Handle new route form submission
router.post('/routes', async (req, res) => {
  const { difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType } = req.body;

  try {
    await Route.create({ difficulty, location, meetingPoint, distance, elevationGain, durationMins, terrainType });
    res.redirect('/routes'); // After successful addition, redirect to routes list
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating route');
  }
});

// Display all photos for a specific trip
router.get('/photos/:tripId', async (req, res) => {
  const { tripId } = req.params;
  try {
    const photos = await Photo.findAll({ where: { idTrip: tripId } });
    res.render('photos', { photos, tripId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching photos');
  }
});

// Add a new photo (form view)
router.get('/photos/new/:tripId', (req, res) => {
  const { tripId } = req.params;
  res.render('addPhoto', { tripId });
});

// Handle new photo form submission
router.post('/photos/:tripId', async (req, res) => {
  const { tripId } = req.params;
  const { url, idAuthor } = req.body;

  try {
    await Photos.create({ url, idAuthor, idTrip: tripId });
    res.redirect(`/photos/${tripId}`); // After successful addition, redirect to photos for the trip
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding photo');
  }
});

// Display all reviews for a specific trip
router.get('/reviews/:tripId', async (req, res) => {
  const { tripId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { idTrip: tripId } });
    res.render('reviews', { reviews, tripId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching reviews');
  }
});

// Add a new review (form view)
router.get('/reviews/new/:tripId', (req, res) => {
  const { tripId } = req.params;
  res.render('addReview', { tripId });
});

// Handle new review form submission
router.post('/reviews/:tripId', async (req, res) => {
  const { tripId } = req.params;
  const { review, idAuthor } = req.body;

  try {
    await Review.create({ review, idAuthor, idTrip: tripId });
    res.redirect(`/reviews/${tripId}`); // After successful addition, redirect to reviews for the trip
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding review');
  }
});


module.exports = router;
