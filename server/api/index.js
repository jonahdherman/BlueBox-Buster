const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin, isVip } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/wishlists', require('./wishlists'));
app.use('/users', require('./users'));
app.use('/reviews', require('./reviews'));
app.use('/tags', require('./tags'));
app.use('/tag_lines', require('./tag_lines'));


module.exports = app;
