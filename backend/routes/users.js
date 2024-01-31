// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/user');

const { linkValidate } = require('../utils/constants');

router.get('/me', getMe);

router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkValidate).required(),
  }),
}), updateUserAvatar);

module.exports = router;
