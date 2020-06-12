const articles = require('express').Router();
const { createArticle, getArticles, articleRemove } = require('../controllers/articles');

const { requestLogger, errorLogger } = require('../middlewares/logger');

articles.use(requestLogger);

articles.delete('/:id', articleRemove);
articles.get('/', getArticles);
articles.post('/', createArticle);

articles.use(errorLogger);

module.exports = articles;
