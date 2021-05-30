const passport = require('passport');
const User = require('../models/User'); //bringing in model to call methods on it

exports.getLogin = (request, response) => response.render('login');

exports.getRegister = (request, response) => response.render('register');

// login handle; implements strategy
exports.postLogin = (request, response, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(request, response, next);
};

exports.postRegister = (request, response) => {
  const { name, email, password, password2 } = request.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords math
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // password is at least 8 char long
  if (password.length < 8) {
    errors.push({ msg: 'Password should be at least 8 characters' });
  }

  // errors rendering...
  if (errors.length > 0) {
    response.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation passed
    //ensure User doesn't exist more than once
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //if user exists
        errors.push({ msg: 'Email is already registered' });
        response.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash password
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;

            // set password to hash
            newUser.password = hash;

            //save user
            newUser
              .save()
              .then((user) => {
                request.flash('success_msg', 'You are now registered!');
                response.redirect('/users/login');
              })
              .catch((error) => console.log(error));
          })
        );
      }
    });
  }
};

exports.logout = (request, response) => {
  request.logout();
  request.flash('success_msg', 'You are logged out');
  response.redirect('/users/login');
};
