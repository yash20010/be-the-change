const transactions = require('../models/Expenses');

module.exports = {
  expensesGet: async (request, response) => {
    try {
      const expense = await Expenses.find({ user: request.user.id });
      response.render('dashboard.ejs', {
        expense: expense,
        user: request.user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  expensesPost: async (request, response) => {
    const { name, amount, donation, total } = request.body;
    try {
      await Expenses.create({
        name: name,
        amount: amount,
        donation: 0,
        total: 0,
        user: request.user.id,
      });
      console.log('hope this works');
      response.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  },
};
