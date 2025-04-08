const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./model/db');
const { sequelize, Member, Route, Trip } = require('./model');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(express.json());




app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});