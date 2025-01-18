//Traemos a express:
const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProductSchema,
  updateProductSchema,
  createProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();

const service = new ProductsService();

//Usando params query + for:
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//En el caso de los dos get a continuacion tenemos rutas similares. Pero si colocamos al endpoint filter (estatico) luego del endpoint id (dinamico) me va a tomar como que la palabra "filter" es un id y me lo devuelve en el endpoint de id.
router.get('/filter', async (req, res) => {
  //Estático
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    //Dinámico
    try {
      const { id } = req.params;
      const product = await service.finOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
