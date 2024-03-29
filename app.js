/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
// для работы с переменными окружения
require('dotenv').config();

// подключаем express
const express = require('express');
const cors = require('cors');

// создаем express-приложение
const app = express();

const corsOptions = {
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  // origin: [
  //   'http://localhost:8080/',
  //   'http://newsexplorer.nomoredomains.club/',
  //   'https://newsexplorer.nomoredomains.club/',
  //   'http://www.newsexplorer.nomoredomains.club/',
  //   'https://www.newsexplorer.nomoredomains.club/',
  //   'http://newsexplorer.nomoredomains.club/',
  //   'https://vaitsehovskiy-tony.github.io/news-explorer-frontend/',
  // ],
  // origin: 'http://localhost:8080',
  origin: 'https://newsexplorer.nomoredomains.club/',
};

app.use(cors(corsOptions));

// Add Access Control Allow Origin headers

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

app.use(limiter);
app.use(helmet());
app.use(cookieParser());

// для сборки JSON-формата
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

// делаем доступными пользователю все публичные файлы
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// используем наш обработчик ошибок
app.use(errorsHandler);

app.listen(config.PORT);
