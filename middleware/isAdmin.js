// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();  // Proceed to the next middleware or route handler
  };
  