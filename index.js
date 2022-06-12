const express=require('express');
const cors=require('cors');
const routerApi=require('./routes');
const {logErrors,errorHandler,boomErrorHandler}=require('./middlewares/error.handler')

const app=express();
//const port=3000;
const port=process.env.PORT||3000;
app.use(express.json())

// const whitelist=['http://127.0.0.1:5501','https://myapp.co','http://127.0.0.1:3000'];
// const options={
//   origin:(origin,callback)=>{
//     if (whitelist.includes(origin)||!origin) {
//       callback(null,true);
//     }
//     else{
//       callback(new Error('no permitidooo'));
//     }
//   }
// }

//app.use(cors(options));
app.use(cors());
routerApi(app);

app.get('/',(req,res)=>{
  res.send('server express samuel');
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

//orden de las lineas da la secuencia
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port ' + port); //console.log resaltado por mala práctica
});

