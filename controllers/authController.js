const router = require("express").Router();
const authService = require("../services/authService");
const { COOKIE_SESSION_NAME } = require("../constants.js");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (password != "" && email != "") {
    try {
      const user = await authService.login(email, password);
      const token = await authService.generateToken(user);
      res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
      res.redirect("/");
    } catch (error) {
      res.render("login", { error: error.message });
    }
  } else {
    res.render("login", { error: "Email and passwrod inputs are mandatory!" });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, rePass } = req.body;

  if (password !== rePass) {
    return res.render("register", { error: "Passwords mismatch!" });
  } else if (username.length < 5) {
    return res.render("register", {error: "The username should be at least five characters long."})
  } else if (email.length < 10) {
    return res.render("register", {error: "The email should be at least ten character long."})
  } else if (password.length < 4) {
    return res.render("register", {error: "The password should be at least four characters long."})
  } else {
    try {
      const user = await authService.create({ username, email, password });
      const token = await authService.generateToken(user);
      res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
      res.redirect("/");
    } catch (error) {
      res.render("register", { error: error.message });
    }
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie(COOKIE_SESSION_NAME);
  res.redirect("/");
});

module.exports = router;
