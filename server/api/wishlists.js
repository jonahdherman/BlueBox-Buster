// const {
//     fetchWishLists,
//   } = require('../db');
  
//   const express = require('express');
//   const app = express.Router();
//   const { isLoggedIn, isAdmin } = require('./middleware');
  
// //   app.put('/:id', isLoggedIn, async(req, res, next)=> {
// //     try {
// //       //TODO make sure the order's user_id is req.user.id
// //       res.send(await updateWishList({ ...req.body, id: req.params.id}));
// //     }
// //     catch(ex){
// //       next(ex);
// //     }
// //   });

//   app.get('/', async(req, res, next)=> {
//     try {
//       res.send(await fetchWishLists());
//     }
//     catch(ex){
//       next(ex);
//     }
//   });
  
//   app.get('/', isLoggedIn, async(req, res, next)=> {
//     try {
//       res.send(await fetchWishLists(req.user.id));
//     }
//     catch(ex){
//       next(ex);
//     }
//   });
  
//   module.exports = app;
  

  const {
    fetchWishLists,
  } = require('../db');
  
 
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async(req, res, next)=> {
    try {
      res.send(await fetchWishLists());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.put('/products/:id', isLoggedIn, isAdmin, (req, res, next)=> {
    res.send('hello world');
  });
  
  
  module.exports = app;