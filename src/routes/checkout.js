const express = require('express');
const moment = require('moment');
const db = require('../models');
const NotFound = require('../exceptions/NotFound');
const BadRequest = require('../exceptions/BadRequest');

const router = express.Router();

const checkoutRouter = async (req, res, next) => {
  const { bookTigerID } = req.params;
  const { username } = req.body;
  const { checkoutStatus } = req.body;

  try {
    if (!bookTigerID || !username || !checkoutStatus) throw new BadRequest('param or query is missing');

    const bookTiger = await db.BookTiger.findOne({
      where: { id: bookTigerID },
    });
    if (!bookTiger) { throw new NotFound('book is not found'); }
    const checkout = await db.Checkout.findOne({
      where: { book_tiger_id: bookTiger.id },
    });
    let userAccount = await db.UserAccount.findOne({
      where: { username },
    });
    if (!userAccount) {
      const userInfo = await db.UserInfo.create({
        email: `${username}@student.42seoul.kr`,
        createdAt: moment(),
        updatedAt: moment(),
      });
      userAccount = await db.UserAccount.create({
        userName: username,
        createdAt: moment(),
        updatedAt: moment(),
        UserInfoId: userInfo.id,
      });
    }
    let userStatus = await db.UserStatus.findOne({
      where: { user_account_id: userAccount.id },
    });
    if (!userStatus) {
      userStatus = await db.UserStatus.create({
        UserAccountId: userAccount.id,
        createdAt: moment(),
        updatedAt: moment(),
      });
    }
    if (bookTiger.active && !checkout
        && (!userStatus.banDate || moment(userStatus.banDate) < moment())) {
      const checkoutCreated = await db.Checkout.create({
        dueDate: moment().add(13, 'day').format('YYYY-MM-DD'),
        checkoutStatus,
        createdAt: moment(),
        updatedAt: moment(),
        BookTigerId: bookTiger.id,
        UserAccountId: userAccount.id,
      });
      console.log('checkout created-----------------');
      console.log(checkoutCreated.dataValues);
      console.log('---------------------------------');
      res.status(200).send('checkout success');
    } else if (!bookTiger.active) throw new Error('this book\'s condition is bad');
    else if (checkout) throw new Error('this book is unavailabe');
    else {
      console.log('---------------------------------');
      console.log('checkout failed');
      console.log('---------------------------------');
      throw new Error('this user is banned');
    }
  } catch (e) {
    next(e);
  }
};

router.post('/:bookTigerID?', checkoutRouter);
module.exports = router;
