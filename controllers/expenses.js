const Expenses = require('../models/Expenses');

module.exports = {
  getExpenses: async (request, response) => {
    const { name, amount, donation, total } = request.body;
    try {
      const expense = await Expenses.find({ user: request.user.id });
      response.render('dashboard.ejs', {
        name,
        amount,
        donation,
        total,
      });
    } catch (error) {
      console.log(error);
    }
  },
  postExpenses: async (request, response) => {
    const { name, amount, donation, total } = request.body;
    try {
      await Expenses.create({
        name,
        amount,
        donation: Math.ceil(amount) - amount,
        total: amount + donation,
        user: request.user.id,
      });
      console.log('hope this works');
      response.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  },
};
