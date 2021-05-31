const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
  expense: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donation: {
    type: Number,
    required: true,
  },
  newTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
});

// put schema in variable
const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;
