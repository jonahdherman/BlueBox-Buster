const {
  fetchBookmarks,
  removeBookmarks,
  createBookmark
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');


app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchBookmarks(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    //TODO make sure the order's user_id is req.user.id 
    res.send(await createBookmark(req.body));
  }
  catch(ex){
    next(ex);
  }
});


app.delete('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    await removeBookmarks({ id: req.params.id, user_id: req.user.id});
    res.sendStatus(201);
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;