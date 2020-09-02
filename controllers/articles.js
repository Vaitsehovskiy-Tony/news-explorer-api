/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
const articleModel = require('../models/article');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const articleRemove = (req, res, next) => {
  articleModel.findById(req.params.id)
    .then((article) => {
      const { owner } = article;
      if (owner === 'null') {
        throw new BadRequestError('Недопустимые символы, используйте латиницу');
      }
      return owner;
    })
    .then((owner) => {
      if (req.user._id !== owner.toString()) {
        throw new ForbiddenError('Недостаточно прав для удаления статьи');
      }
      return articleModel.findByIdAndRemove(req.params.id)
        .then((article) => {
          if (article) {
            res.send({ data: article });
          } else {
            throw new NotFoundError('Нет статьи с таким id');
          }
        })
        .catch(next);
    })
    .catch(err => {
      throw new ForbiddenError('Недостаточно прав для удаления статьи');
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  articleModel.find({ owner: req.user._id })
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  articleModel.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports = {
  createArticle,
  getArticles,
  articleRemove,
};
