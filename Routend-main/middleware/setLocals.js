// middleware/setLocals.js
import jwt from 'jsonwebtoken';

export default function setLocals(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.isLoggedIn = true;
      res.locals.isAdmin = decoded.isAdmin === 1;
      res.locals.name = decoded.username || ''; // or you can fetch it from DB if needed
    } catch (err) {
      res.locals.isLoggedIn = false;
      res.locals.isAdmin = false;
      res.locals.name = '';
    }
  } else {
    res.locals.isLoggedIn = false;
    res.locals.isAdmin = false;
    res.locals.name = '';
  }

  next();
}
