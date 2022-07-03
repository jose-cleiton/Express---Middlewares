const express = require('express');
const routes = express.Router();
const Author = require('../service/Author');
const { authMiddleware , errorHandler} = require('../middleware');



routes.use(authMiddleware)
routes.get('/:id', Author.getById);
routes.get('/search',  Author.getSearchByName_maxPrice);
routes.get('/',  Author.get);

routes.post('/', Author.post);

routes.put('/:id', Author.putById);

routes.delete('/:id', Author.deleteById);

routes.all('*', Author.notFound);

module.exports = routes;