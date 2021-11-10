/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
// для работы с переменными окружения
require('dotenv').config();

// подключаем express
const express = require('express');

const cors = require('cors');

const corsOptions = {
  // origin: 'https://newsexplorer.nomoredomains.club/',
  origin: '*',
  optionsSuccessStatus: 200,
};

// создаем express-приложение
const app = express();

// const corsOptions = {
//   origin: [
//     'http://localhost:8080/',
//     '178.154.207.181',
//     'http://newsexplorer.nomoredomains.club/',
//     'https://newsexplorer.nomoredomains.club/',
//     // 'http://myownnews.ru.com/api',
//     // 'https://myownnews.ru.com/api',
//     'http://www.newsexplorer.nomoredomains.club/',
//     'https://www.newsexplorer.nomoredomains.club/',
//     // 'http://www.myownnews.ru.com/api',
//     // 'https://www.myownnews.ru.com/api',
//     'https://vaitsehovskiy-tony.github.io/',
//     'https://vaitsehovskiy-tony.github.io//news-explorer-frontend/',
//   ],
//   // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   // preflightContinue: false,
//   // optionsSuccessStatus: 204,
//   credentials: true,
// };

app.use(cors(corsOptions));
// парсер данных
const bodyParser = require('body-parser');

// парсер приходящих куки
const cookieParser = require('cookie-parser');

// заголовки безопасности проставляем автоматически
const helmet = require('helmet');

// защита от брутфорса и DDоSа
const rateLimit = require('express-rate-limit');

// подключаем мангуз
const mongoose = require('mongoose');

// совместимость путей между платформами.
// на вин, линукс и мак пути записываются по-разному
const path = require('path');

// конфиг переменных окружения и порт
const config = require('./config');

const limiter = rateLimit({
  // за 15 минут
  windowMs: 15 * 60 * 1000,
  // можно совершить максимум 100 запросов с одного IP
  max: 100,
});

// configuring CORS
// app.use('*', function(req, res, next) {
//   const { origin } = req.headers;
//   if (ALLOWED_ORIGINS.includes(origin)) res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   if (req.method === 'OPTIONS') res.status(204).send('OK');
//   else next();
// });

app.use(limiter);
app.use(helmet());
app.use(cookieParser());

// для собирания JSON-формата
app.use(bodyParser.json());
// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// импорт основного роутера
const router = require('./routes/index');
// импорт нашего обработчика ошибок
const errorsHandler = require('./middlewares/errorsHandler');

// подключаемся к серверу mongo
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// отслеживание ошибок в консоли
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch(() => {
//   console.log('Connection error');
// });

// делаем доступными пользователю все публичные файлы
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// используем наш обработчик ошибок
app.use(errorsHandler);

app.listen(config.PORT);
