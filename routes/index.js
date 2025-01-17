const express = require('express');

const productRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');



function routerApi(app) {
  //Creamos un router general para manejar versiones
  const router = express.Router();
  app.use('/api/v1', router);
  //Utilizamos ese router para cada endpoint
  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
