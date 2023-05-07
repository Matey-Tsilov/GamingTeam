const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.create = async (userData) => User.create(userData);
//ще работи само ако username е уникално!
exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw { message: "Cannot find email or password!" };
  }

  const isSame = await bcrypt.compare(password, user.password);

  if (!isSame) {
    throw { message: "Cannot find email or password!" };
  }
  return user
};
exports.generateToken = (user) => {
    const payload = { _id: user._id, username: user.username, email: user.email };
    const options = {expiresIn: '2d'}
  
    const tokenPromise = new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET, options, (err, decodedToken) => {
          if (err) {
             return reject(err)
          }
  
          resolve(decodedToken)
      });
  })
  return tokenPromise
} 
