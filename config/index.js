module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
  MONGODB_URL: 'mongodb://localhost:27017/newsdb',
};
