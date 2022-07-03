module.exports =  (err, req, res, next) => {
  console.log(`Status: ${err.status} Mensagem de Erro: ${err.message} `);
  res.status(err.status|| 500).json({message :err.message});
  next();
};


