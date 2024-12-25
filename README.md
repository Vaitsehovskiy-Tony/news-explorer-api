## news-explorer-api
____

#### Project is available at the following addresses:
#### 84.201.169.56
#### http://myownnews.ru.com/
#### https://myownnews.ru.com/
#### http://myownnews.ru.com/api
#### https://myownnews.ru.com/api


#### v0.0.3

#### Technology stack: MongoDB, JavaScript, Git, Node.js, REST API


#### Practical work on interacting with MongoDB and applying REST API principles

* GET request /users/me returns user information (email and name):
  GET http://localhost:3000/users/<-USER_ID->

* POST request /users creates a new user:
  POST http://localhost:3000/users

* GET request /articles returns all articles saved by the user:
  GET http://localhost:3000/articles

* POST request /articles creates an article with the following
  data in the body:keyword, title, text, date, source, link, and image:
  POST http://localhost:3000/articles

##### Development build is launched with the command npm run dev and is available at [localhost](http://localhost:3000/)


List of Connected Modules

 * app.js - main module 
 * routers/index.js - main router
 * routes/article.js - articles router
 * routes/users.js - users router
 
 * middlewares/auth.js - authorization middleware
 * middlewares/logger.js - logging middleware
 * middlewares/errorsHandler.js - error-handling middleware

 * controllers/articles.js - controller with article-related functions
 * controllers/users.js - controller with user-related functions
 * models/article.js - article model 
 * models/user.js - user model
   
