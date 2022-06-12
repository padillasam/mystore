const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Antes de middlewares de error
// router.get('/:id',async(req,res)=>{
//   const{id}=req.params;
//   const product=await service.findOne(id);
//   res.json(product);
// });

router.get('/:id', validatorHandler(getProductSchema,'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//Antes dl validador
// router.post('/', async (req, res) => {
//   const body = req.body;
//   const newProduct = await service.create(body);
//   res.status(201).json(newProduct);
// });


//Antes de middlewares
// router.patch('/:id',async(req,res)=>{
//   try {
//     const {id}=req.params;
//     const body=req.body;
//     const product =await service.update(id,body);
//     res.json(product);

//   } catch (error) {
//   res.status(404).json({
//     message:error.message
//   });
//   }
//   });

router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

//Antes del validator
// router.patch('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const body = req.body;
//     const product = await service.update(id, body);
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// });
router.patch('/:id',
validatorHandler(getProductSchema,'parmas'),
validatorHandler(updateProductSchema,'body'),
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
