const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.redirect('/unauthorized');
  }
  next();
};

module.exports = isAdmin;