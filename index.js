import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import routeRoutes from './routes/routes.js';
import tripRoutes from './routes/trips.js';
import reviewroutes from './routes/reviews.js';
import photosroutes from './routes/photos.js';
import adminUsersroutes from './routes/admin.js';
import apiRouterReviews from './routes/api/reviews.js';
import apiRouterTrips from './routes/api/trips.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import setLocals from './middleware/setLocals.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setLocals);
app.use(authRoutes);
app.use(routeRoutes);
app.use(tripRoutes);
app.use(reviewroutes);
app.use(photosroutes);
app.use(adminUsersroutes);
app.use(apiRouterReviews);
app.use(apiRouterTrips);
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000 🚀');
});