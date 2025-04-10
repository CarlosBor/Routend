const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/routes');
const tripRoutes = require('./routes/trips');
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(routeRoutes);
app.use(tripRoutes);
app.use(express.json());

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});