const express = require('express');
const router = express.Router();
const { Member, Route, Photo, Review, Trip, MemberTrip } = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const authenticateToken = require('../middleware/authenticateToken');

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

    const payload = { userId: member.idMember, isAdmin: member.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });


    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); 
    res.redirect('/trips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

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

router.get('/unauthorized', (req, res) => {
  res.render('unauthorized');  // This will render the 'unauthorized.pug' view
});

module.exports = router;