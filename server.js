//Entry point of the application
const express = require('express');
const errorHandler = require("./middleware/errHandler");
const databaseConnect = require("./config/dbConnection");
//const passport = require('./passport-config');
const dotenv = require("dotenv").config();


databaseConnect();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


// // Google authentication route
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

// // Facebook authentication route
// app.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email'] }));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));




//middleware for routes
app.use("/api/vendor", require("./router/vendorsRoutes"));
app.use("/api/customers", require("./router/customerRoutes"));
app.use("/api/services", require("./router/dataVendorRoutes"));
app.use("/api/booking", require("./router/bookingRoutes"))

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})