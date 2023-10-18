const {
    fetchWishList,
    fetchAllWishLists,
    createWishList,
    removeWishList,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await fetchWishList(req.user.id));
    }  
    catch(ex){
      next(ex);
    }
  });

  app.get('/all', isLoggedIn, isAdmin, async(req, res, next)=> {
    try {
      res.send(await fetchAllWishLists());
    }  
    catch(ex){
      next(ex);
    }
  });
  
  app.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await createWishList({user_id: req.user.id, product_id: req.body.product_id}));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.delete('/:id', isLoggedIn, async(req, res, next)=> {
    try {
      await removeWishList({id: req.params.id, user_id: req.user.id});
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;
  