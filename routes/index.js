//import productsRouter from './productsrouter';
//const usersRouter=require('./users.router')
const express=require('express');
const productsRouter = require('./products.router');
const usersRouter=require('./users.router')
function routerApi(app) {
  const router=express.Router();
  app.use('/api/v1', router);
  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  // app.use('/categories',categoriesRouter);
}
module.exports = routerApi;
