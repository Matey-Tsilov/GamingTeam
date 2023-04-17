const { COOKIE_SESSION_NAME } = require("../constants");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.auth = (req, res, next) => {
  const token = req.cookies[COOKIE_SESSION_NAME];

  if (token) {
    //така потвърждаваме че никой не е пипал тяо токен, че това е официално издаденият токен!
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        res.clearCookie(COOKIE_SESSION_NAME);
        return next(err);
      }

      req.user = decodedToken;
      //за да може да го имаме при темплейтинга!
      res.locals.user = decodedToken;
      
      next();
    });
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.render('404')
    }
    next()
}
