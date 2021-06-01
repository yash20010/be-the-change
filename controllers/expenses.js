const Expenses = require('../models/Expenses');

module.exports = {
  getExpenses: async (request, response) => {
    const { name, amount, donation, date, total } = request.body;
    try {
      const expenses = await Expenses.find({ user: request.user.id });
      response.render('dashboard.ejs', {
        date,
        expenses,
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
    const { name, amount, donation } = request.body;
    try {
      await Expenses.create({
        name,
        amount,
        donation: (Math.ceil(amount) - amount).toFixed(2),
        total: Math.ceil(amount),
        user: request.user.id,
      });
      console.log('hope this works');
      response.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  },
};
