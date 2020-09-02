const articles = require('express').Router();
const { errors, celebrate } = require('celebrate');
const { articlePostSchema } = require('../schemas/articlePostSchema');
const { createArticle, getArticles, articleRemove } = require('../controllers/articles');

const { requestLogger, errorLogger } = require('../middlewares/logger');

articles.use(requestLogger);

articles.delete('/:id', articleRemove);
articles.get('/', getArticles);
articles.post('/', celebrate(articlePostSchema), createArticle);

articles.use(errors());

articles.use(errorLogger);

module.exports = articles;
