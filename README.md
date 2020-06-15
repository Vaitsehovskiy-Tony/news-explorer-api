## news-explorer-api
____

#### Проект доступен по следующим адресам:
#### 84.201.169.56
#### http://myownnews.ru.com/
#### https://myownnews.ru.com/

#### v0.0.1

#### Стек технологий: MongoDB, JavaScript, Git, Node.js, API REST


#### Практическая работа по взаимодействию с Mongo DB и использованию принципов API REST

* запрос GET /users/me возвращает информацию о пользователе (email и имя);
  GET http://localhost:3000/users/<-ID пользователя->

* запрос POST /users создаёт пользователя;
  POST http://localhost:3000/users

* запрос GET /articles возвращает все сохранённые пользователем статьи;
  GET http://localhost:3000/articles
  
* запрос POST /articles создаёт статью с переданными в теле
  keyword, title, text, date, source, link и image
  POST http://localhost:3000/articles

##### Development-сборка собирается командой npm run dev по адресу [localhost](http://localhost:3000/)


Список подключенных модулей 

 * app.js - основной модуль  
 * routers/index.js - основной роутер
 * routes/article.js - роутер карточек  
 * routes/users.js - роутер пользователей
 
 * middlewares/auth.js - мидлвар авторизации
 * middlewares/logger.js - мидлвар логгирования 
 * middlewares/errorsHandler.js - мидлвар обработчика ошибок

 * controllers/articles.js - контроллер с функциями карточек  
 * controllers/users.js - контроллер с функциями пользователей  
 * models/article.js - модель карточки  
 * models/user.js - модель пользователя  
  
__________________

~~подключение к удаленному серверу ssh developer@84.201.169.56~~
