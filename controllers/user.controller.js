const passport = require('passport');
const User = require('../models/User.model');

exports.register = function(req, res, next) {
  // Get form values
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  const newUser = new User({
    email: email,
    username: username,
    password: password,
    password2: password2
  });

  User.createUser(newUser, function(err, user) {
    if(err) throw err;
    console.log(user);
    res.status(200).end();
  });
}

exports.login = function(req, res, next) {
  const auth = passport.authenticate('local', function(err, user) {
    if(err) {
      return next(err);
    }
    if(!user) {
      res.send({
        success: false
      })
    }
    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }
      res.send({
        success: true,
        user: user
      });
    });
  });
  auth(req, res, next);
}