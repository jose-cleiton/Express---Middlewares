const express = require('express');
const bodyParser = require('body-parser');
const {errorHandler}= require('./middleware');


const app = express();
app.use(bodyParser.json());


// app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   next();
// });

app.use('/recipes',  require('./router/recipesRouter'));
app.use(errorHandler);
app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});
// app.use((error, req, res, next)=> {
//   if(error.code && error.status) {
//     res
//     .status(error.status)
//     .json({message: error.message, code: error.code});
//   }
//   return res.status(500).json({message: error.message});
// });
