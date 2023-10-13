const {
  fetchReviews,
  createReviews
} = require('../db/reviews');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  }
  catch (ex) {
    next(ex);
  }
});

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await createReviews(req.body));
  } catch (error) {
    next(error)
  }
});

module.exports = app;