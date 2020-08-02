// создаем роутер
const router = require('express').Router();

// импортируем celebrate и обработчик ошибок
const { errors, celebrate } = require('celebrate');

// схемы celebrate
const { signInSchema } = require('../schemas/signInSchema');
const { signUpSchema } = require('../schemas/signUpSchema');

// миддлвары
const errorsHandler = require('../middlewares/errorsHandler');

// библиотека для логгирования winston
const { requestLogger, errorLogger } = require('../middlewares/logger');

// контроллеры
const { signIn } = require('../controllers/signin');
const { signUp } = require('../controllers/signup');
const { logout } = require('../controllers/users');

// миддлвар авторизации
const auth = require('../middlewares/auth');

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

router.use('/logout', logout);

// наша обработка ошибок
router.use(errorsHandler);

// логгер ошибок
router.use(errorLogger);

// обработчик ошибок celebrate
router.use(errors());

// экспортируем роутер
module.exports = router;
