//para ser middleware debe tener los 4 parametros
function logErrors(err,req,res,next){
  console.log('ejecutando logerrors');
  console.error(err);
  next(err);
}

function errorHandler(err,req,res,next){
  console.log('ejecutando errorHandler');
  res.status(500).json({
    message:err.message,
    stack:err.stack,
  })
}

function boomErrorHandler(err,req,res,next){
  if (err.isBoom) {
    const {output}=err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports={logErrors,errorHandler,boomErrorHandler}
