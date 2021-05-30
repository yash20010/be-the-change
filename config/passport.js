const LocalStrategy = require('passport-local').Strategy; // creates strategy
const mongoose = require('mongoose'); // bring mongoose to make sure login credentials match
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');

// exporting strategy
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // match user
      User.findOne({ email: email.toLowerCase() })
        .then((user) => {
          if (!user) {
            // return done if user doesn't exist
            return done(null, false, {
              message: 'That email is not registered',
            });
          }

          // match password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
