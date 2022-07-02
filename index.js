const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth-middleware');

const app = express();
app.use(bodyParser.json());
app.use(authMiddleware);

const recipesRouter = require('./router/recipesRouter');
app.use('/recipes', recipesRouter);

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});