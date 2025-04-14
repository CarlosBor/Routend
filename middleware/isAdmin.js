const isAdmin = (req, res, next) => {
  console.log(req.user.isAdmin);
  if (!req.user || !req.user.isAdmin) {
    return res.redirect('/unauthorized');
  }
  next();
};

module.exports = isAdmin;