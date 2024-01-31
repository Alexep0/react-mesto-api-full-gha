const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedErr = require('../errors/UnauthorizedErr');
const { linkValidate } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: { validator: (v) => linkValidate.test(v) },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: { validator: (v) => isEmail(v) },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedErr('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return Promise.reject(new UnauthorizedErr('Неправильные почта или пароль'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
