module.exports = {
  getIndex: (request, response) => {
    response.render('index.ejs');
  },
  getDashboard: (request, response) => {
    const { name, amount, donation, total } = request.body;
    response.render('dashboard', {
      // shows username when dashboard rendered
      name: request.user.name,
      expense: {
        name,
        amount,
        donation,
        total,
      },
    });
  },
};
