// middleware/role.js
module.exports.isContributor = (req, res, next) => {
  if ( req.user.role === "contributor") {
    return next();
  }
  req.flash("error", "You must be a contributor to perform this action");
  res.redirect("/auth/login");
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  req.flash("error", "Admin access only");
  res.redirect("/auth/login");
};
