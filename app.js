require('dotenv').config();
const express = require('express');
const cors = require('cors'); // браузер отправляет сначала запрос OPTIONS, содержащий заголовки,
// с какого домена пришел запрос, сервер должен "разрешить" запросы с помощью заголовков ответа
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { limiter } = require('./limiter');

const { centrErrorHandler } = require('./centrErrorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DATABASE_URL } = require('./config');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    '84.201.169.56',
    'http://myownnews.ru.com',
    'https://myownnews.ru.com',
    'http://myownnews.ru.com/api',
    'https://myownnews.ru.com/api',
    'http://www.myownnews.ru.com',
    'https://www.myownnews.ru.com',
    'http://www.myownnews.ru.com/api',
    'https://www.myownnews.ru.com/api',
    'https://vaitsehovskiy-tony.github.io',
    'https://vaitsehovskiy-tony.github.io//news-explorer-frontend',
  ],
  // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());// подключаем парсер кук как мидлвэр
// подключаем helmet
app.use(helmet());

// подключаем rate-limiter
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// обработчики ошибок
app.use(errorLogger); // подключаем логгер ошибок

// централизованный обработчик ошибок
app.use(centrErrorHandler);
