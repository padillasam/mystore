//console.log('hola');
//los corchetes {faker} antes del = se deben quitar de faker
const { response } = require('express');
const  faker  = require('faker');
const express = require('express');
const app = express();

const port = 3000;
//ruta default
app.get('/', (req, res) => {
  res.send('hola mi server express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('hola soy una nueva ruta');
});

// //get debe dar lista de productos
// app.get('/products', (req, res) => {
//   res.json([
//     {
//       name: 'producto1',
//       price: 1000,
//     },
//     {
//       name: 'producto2',
//       price: 2000,
//     },
//   ]);
// });
//params.id debe coincidir con el parametro que va junto a products/
//o se destructura
app.get('/products/:id', (req, res) => {
  //const id=req.params.id;  //se usa una de las dos formas
  const {id}= req.params;
  res.json({
    id,
    name: 'producto2',
    price: 2000,
  });
});

//parametros tipo query
app.get('/users',(req,res)=>{
  const{limit,offset}=req.query;
  if (limit&&offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('No hay parametros');
  }
});

app.get('/categories/:categoryId/products/:productId',(req,res)=>{
  const{categoryId,productId}=req.params;
  res.json({
    categoryId,
    productId,
  });
})

app.listen(port, () => {
  console.log('mi port ' + port); //console.log resaltado por mala práctica
});


// //get debe dar lista de productos
// //ejemplo con 100
// app.get('/products', (req, res) => {
//   const products=[];
//     for (let index = 0; index < 100; index++) {
//     products.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(),10),
//       image: faker.image.imageUrl(),
//     });
//   }
//     res.json(products);
// });


//ejemplo con 100 variación
app.get('/products', (req, res) => {
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

//endpoints especificos antes de los dinámicos
//para que las rutas no choquen
//pero en esta version no chocaron
app.get('/products/filter',(req,res)=>{
  res.send('Yo soy un filter');
})
