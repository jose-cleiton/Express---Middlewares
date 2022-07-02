const express = require('express');
const router = express.Router();
const Author = require('../service/Author');
const { authMiddleware } = require('../middleware');

router.use(authMiddleware)
router.get('/search',  Author.getSearchByName_maxPrice);
router.get('/',  Author.get);
router.get('/:id', Author.getById);

router.post('/', Author.post);

router.put('/:id', Author.putById);

router.delete('/:id', Author.deleteById);

router.all('*', Author.notFound);

module.exports = router;