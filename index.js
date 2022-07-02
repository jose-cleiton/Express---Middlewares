const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.use('/recipes',  require('./router/recipesRouter'));

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});