const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/config');

const register = (email, username, password) => {
  let user = new User({ email, username, password });
  console.log(user);
  return user.save();
}
const login = async (username, password) => {
  let user = await User.findOne({ username })

  if (!user) {
    throw { message: 'Invalid user', status: 404 };
  }
  let isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) {
    throw { message: 'Invalid password', status: 404 };
  }
let token = jwt.sign({_id: user._id, username: user.username}, SECRET);
return token;
};

module.exports = {
  register,
  login,
}