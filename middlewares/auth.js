const isLoggedIn = function (req, res, next) {
  if (!req.session.userId) {
      const error = "User not Found, Please Login";
      res.redirect(`/?error=${error}`);
  } else {
      next();
  }
};

const roleAdmin = function (req, res, next) {
  if (req.session.role !== "admin") {
      const error = "Youre not an Admin";
      res.redirect(`/?error=${error}`);
  } else {
      next();
  }
}

const roleUser = function (req, res, next) {
  if (req.session.role !== "user") {
      const error = "Youre not an User";
      res.redirect(`/?error=${error}`);
  } else {
      next();
  }
}

module.exports = {isLoggedIn, roleAdmin, roleUser}
