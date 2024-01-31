/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { celebrate, Joi, errors } = require('celebrate');
const { linkValidate } = require('./utils/constants');
const NotFoundErr = require('./errors/NotFoundErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const errorHandler = require('./middlewares/error');

mongoose.connect('mongodb://127.0.0.1/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkValidate),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
