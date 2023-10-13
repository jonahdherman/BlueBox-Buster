const {
    createTag,
    fetchTags,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async (req, res, next) => {
    try {
      res.send(await fetchTags());
    }
    catch (ex) {
      next(ex);
    }
  });
  
  app.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      res.send(await createTag(req.body));
    } catch (error) {
      next(error)
    }
  });
  
  module.exports = app;