// Using Express
const express = require('express');
const router = express.Router();
const plaid = require('plaid');
const moment = require('moment');
const { ensureAuth } = require('../middleware/auth');

//require('dotenv').config({ path: '../config/.env' });

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//models (move them later)
//const Account = require('../models/Account');
const User = require('../models/User');
const Expenses = require('../models/Expenses');

let accessToken = null;
let publicToken = null;
let itemId = null;

//Plaid New Client
const plaidClient = new plaid.Client({
  clientID: '',
  secret: '',
  env: plaid.environments.sandbox,
});

//creates link_token with the config object as params
router.post('/create_link_token', async (request, response) => {
  try {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    const clientUserId = 'user.id';
    // Create the link_token with all of your configurations
    const tokenResponse = await plaidClient.createLinkToken({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'be(the)change',
      products: ['transactions'],
      account_filters: {
        depository: {
          account_subtypes: ['checking'],
        },
      },
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });
    response.json(tokenResponse);
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

//get accessToken
router.post('/exchange_token', async (request, response, next) => {
  try {
    const publicToken = request.body.public_token;

    // Exchange the client-side public_token for a server access_token
    const tokenResponse = await client.exchangePublicToken(publicToken);

    // Save the access_token and item_id to a persistent database
    const accessToken = tokenResponse.access_token;
    const itemId = tokenResponse.item_id;

    //get transactions
    const now = moment();
    const today = moment().format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

    const transactions = await plaidClient.getTransactions(
      accessToken,
      thirtyDaysAgo,
      today,
      (err, res) => {
        res.send(res.transactions);
        console.log(res.transactions);
      }
    );
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

router.get('/transactions', async function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  const now = moment();
  const today = moment().format('YYYY-MM-DD');
  const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

  const configs = {
    access_token: accessToken,
    start_date: thirtyDaysAgo,
    end_date: today,
  };
  try {
    const transactionsResponse = await client.getTransactions(configs);
    const transactions = transactionsResponse.data.transactions;
    response.json(transactions);
    console.log(transactions);
  } catch (error) {
    //prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

module.exports = router;
