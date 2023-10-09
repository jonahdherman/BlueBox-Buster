const {
  fetchProducts,
  createProduct
} = require('../db/products');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', isLoggedIn, isAdmin, async(req, res, next)=> {
  console.log(req.body);
  res.send(await createProduct(req.body));
});

app.put('/products/:id', isLoggedIn, isAdmin, (req, res, next)=> {
  res.send('hello world');
});


module.exports = app;
