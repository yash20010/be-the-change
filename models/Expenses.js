const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donation: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// put schema in variable
const Expenses = mongoose.model('Expenses', ExpensesSchema);

module.exports = Expenses;
