const express = require('express'); //brings in express
const app = express(); //assigning the returned express function to 'app'
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts'); //bring in ejs layouts
const flash = require('connect-flash'); // redirects messages after register
const logger = require('morgan'); // bring morgan to ensure requests
const connectDB = require('./config/database');

//Routes
const mainRoutes = require('./routes/main'); //assigning main routes path to a variable
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/plaid');

// environment file
require('dotenv').config({ path: './config/.env' });

// passport config
require('./config/passport')(passport);

// db connection
connectDB();

// middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(logger('dev'));

// Sessions
app.use(
  session({
    secret: 'shhhh',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables for flash messages
app.use((request, response, next) => {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  next();
});

// Routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/plaid', apiRoutes);

// PORT for localhost
app.listen(process.env.PORT, () => {
  console.log(
    `the ${process.env.PORT} server is running; you better catch it!`
  );
});
