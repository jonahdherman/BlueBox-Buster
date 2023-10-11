const {
    fetchWishListItems,
    fetchAllWishListItems,
    createWishListItem,
    updateWishListItem,
    deleteWishListItem,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await fetchWishListItems(req.user.id));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.get('/all', isLoggedIn, isAdmin, async(req, res, next)=> {
    try {
      res.send(await fetchAllWishListItems());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      //TODO make sure the order's user_id is req.user.id 
      res.send(await createWishListItem(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
  
  app.put('/:id', isLoggedIn, async(req, res, next)=> {
    try {
      //TODO make sure the order's user_id is req.user.id 
      res.send(await updateWishListItem({...req.body, id: req.params.id}));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.delete('/:id', isLoggedIn, async(req, res, next)=> {
    try {
      //TODO make sure the order's user_id is req.user.id 
      await deleteWishListItem({ id: req.params.id });
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;
  