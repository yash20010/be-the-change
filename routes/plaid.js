// Using Express
const express = require('express');
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../../config/.env' });

//models (move them later)
const Account = require('../models/Account');
const User = require('../models/User');

let accessToken = null;
let publicToken = null;
let itemID = null;

//Plaid New Client
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

router.post('/create_link_token', async function (request, response) {
  // Get the client_user_id by searching for the current user
  const user = await User.find(request.user.id);
  const config = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: user.id,
    },
    client_name: 'Plaid Test App',
    products: ['transactions'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    response.json(createTokenResponse.data);
  } catch (error) {
    const err = error.response.data;
  }
});

//get accessToken
router.post('/exchange_public_token', async function (request, response, next) {
  const publicToken = request.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
  } catch (error) {
    const err = error.response.data;
  }
});

// router.get('/accounts', async function (request, response, next) {
//   try {
//     const accountsResponse = await client.accountsGet({
//       access_token: accessToken,
//     });
//     prettyPrintResponse(accountsResponse);
//     response.json(accountsResponse.data);
//   } catch (error) {
//     prettyPrintResponse(error);
//     return response.json(formatError(error.response));
//   }
// });

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
    const transactionsResponse = await client.transactionsGet(configs);
    prettyPrintResponse(transactionsResponse);
    response.json(transactionsResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

module.exports = router;
