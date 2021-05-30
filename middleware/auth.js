module.exports = {
  //protect any route w/o longin
  ensureAuth: function (request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
    request.flash('error_msg', 'Please log in to view this resource');
    response.redirect('/users/login');
  },
  ensureGuest: function (request, response, next) {
    if (!request.isAuthenticated()) {
      return next();
    } else {
      response.redirect('/dashboard');
    }
  },
};
