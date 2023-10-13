const {
  fetchProducts,
  createProduct,
  updateProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  }
  catch (ex) {
    next(ex);
  }
});

app.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await createProduct(req.body));
  } catch (error) {
    next(error)
  }
});

app.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await updateProduct(req.body));
  } catch (error) {
    next(error);
  }
});


module.exports = app;
