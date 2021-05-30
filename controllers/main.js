module.exports = {
  getIndex: (request, response) => {
    response.render('index.ejs');
  },
  getDashboard: (request, response) => {
    response.render('dashboard', {
      // shows username when dashboard rendered
      name: request.user.name,
    });
  },
};
