//single responsability
//rest api separación responsabilidades
const express=require('express');
const faker=require('faker');
const router=express.Router();

//ejemplo con 100 variación
router.get('/', (req, res) => {
  const products=[];
  const {size}=req.query;
  const limit=size||10;
    for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
    });
  }
    res.json(products);
});

router.get('/:id', (req, res) => {
  //const id=req.params.id;  //se usa una de las dos formas
  const {id}= req.params;
  if (id===999) {
    res.status(404).json({
      message:'not found',
    })
  } else {
    res.json({
      id,
      name: 'producto2',
      price: 2000,
    });
  }
});

//endpoints especificos antes de los dinámicos
//para que las rutas no choquen
//pero en esta version no chocaron
router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
})

router.post('/',(req,res)=>{
const body=req.body;
res.status(201).json({
  message:'created',
  data:body
});
})

router.patch('/:id',(req,res)=>{
  const {id}=req.params;
  const body=req.body;
  res.json({
    message:'update',
    data:body,
    id,
  });
  });


  router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    res.json({
      message:'deleted',
      id,
    });
    });


module.exports=router;
