// создаем роутер
const router = require('express').Router();

// импортируем celebrate и обработчик ошибок
const { errors, celebrate } = require('celebrate');

// схемы celebrate
const { signInSchema } = require('../schemas/signInSchema');
const { signUpSchema } = require('../schemas/signUpSchema');

// миддлвары
const auth = require('../middlewares/auth');
const errorshandler = require('../middlewares/errorsHandler');

// библиотека для логгирования winston
const { requestLogger, errorLogger } = require('../middlewares/logger');

// контроллеры
const { signIn } = require('../controllers/signin');
const { signUp } = require('../controllers/signup');

// роутеры
const users = require('./users');
const articles = require('./articles');

// логгер запросов
router.use(requestLogger);

// роуты регистрации  и логина
router.post('/signup', celebrate(signUpSchema), signUp);
router.post('/signin', celebrate(signInSchema), signIn);

// роут авторизации
router.use(auth);

// роуты users и cards
router.use('/users', users);
router.use('/articles', articles);

// логгер ошибок
router.use(errorLogger);

// обработчик ошибок celebrate
router.use(errors());

// наша обработка ошибок
router.use(errorshandler);

// экспортируем роутер
module.exports = router;
