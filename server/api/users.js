const {
    fetchUsers,
    createUser,
    updateUser,
    updateSelf
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin, } = require('./middleware');
  
  app.get('/', async(req, res, next)=> {
    try {
        res.send(await fetchUsers());
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/', async(req, res, next)=> {
    try {
        res.send(await createUser(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

  app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
    try {
        res.send(await updateUser({ id: req.params.id, ...req.body}));
    }
    catch(ex){
      next(ex);
    }
  });

  app.put('/settings/:id', isLoggedIn, async(req, res, next)=> {
    try {
        res.send(await updateSelf({ id: req.params.id, ...req.body}));
    }
    catch(ex){
      next(ex);
    }
  });

  
  module.exports = app;