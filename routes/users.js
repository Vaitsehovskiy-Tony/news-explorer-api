const routerUsers = require('express').Router();
const { getUser, findUser } = require('../controllers/users');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routerUsers.use(requestLogger);


routerUsers.get('/me', getUser);
routerUsers.get('/:id', findUser);

routerUsers.use(errorLogger);

module.exports = routerUsers;
