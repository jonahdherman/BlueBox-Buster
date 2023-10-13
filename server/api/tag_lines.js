const {
    createTag_line,
    fetchTag_lines,
    deleteTag_line
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async (req, res, next) => {
    try {
      res.send(await fetchTag_lines());
    }
    catch (ex) {
      next(ex);
    }
  });
  
  app.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      res.send(await createTag_line(req.body));
    } catch (error) {
      next(error)
    }
  });

  app.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      res.send(await deleteTag_line({ id: req.params.id, ...req.body}));
    } catch (error) {
      next(error)
    }
  });
  
  module.exports = app;