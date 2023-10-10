const {
    fetchUsers
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin, isVip } = require('./middleware');
  
  app.get('/', isLoggedIn, isAdmin, async(req, res, next)=> {
    try {
        res.send(await fetchUsers());
    }
    catch(ex){
      next(ex);
    }
  });

  
  module.exports = app;