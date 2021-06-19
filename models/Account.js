const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  accessToken: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  institutionId: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
  },
  accountSubtype: {
    type: String,
  },
  donation: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
