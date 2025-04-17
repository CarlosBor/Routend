const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.redirect('/unauthorized');
  }
  next();
};

export default isAdmin;