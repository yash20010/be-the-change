const Account = require('../models/Account');

module.exports = {
  getAccount: async (request, response) => {
    const { name, amount, donation, date, total } = request.body;
    try {
      const account = await Account.find({ user: request.user.id });
      response.render('dashboard.ejs', {
        name: request.user.name,
        account,
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
