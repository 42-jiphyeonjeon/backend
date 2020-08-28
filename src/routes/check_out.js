const express = require('express');
const db = require('../models');
const moment = require('moment');
const NotFound = require('../exceptions/NotFound');
const BadRequest = require('../exceptions/BadRequest');
const router = express.Router();

const checkout = async (req, res, next) => {
  const bookTigerID = req.params.bookTigerID;
  const username = req.query.username;
  const bookCondition = req.query.book_condition;

  try {
    if (!bookTigerID || !username || !bookCondition)
      throw new BadRequest('param or query is missing');
      
    const bookTiger = await db.BookTiger.findOne({
      where: { id: bookTigerID }
    });
    if (!bookTiger) 
      throw new NotFound('book is not found');
    const checkout = await db.Checkout.findOne({
      where: { book_tiger_id: bookTiger.id }
    });
    let userAccount = await db.UserAccount.findOne({
      where: { username }
    });
    if (!userAccount) userAccount = await db.UserAccount.create({
      userName: username,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    })
    let userStatus = await db.UserStatus.findOne({
      where: { user_account_id: userAccount.id }
    })
    if (!userStatus) userStatus = await db.UserStatus.create({
      UserAccountId: userAccount.id,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    });
    if (bookTiger.active && !checkout 
        && (!userStatus.banDate || moment(userStatus.banDate) < moment())) {
      let checkoutCreated = await db.Checkout.create({
        dueDate: moment().add(13, 'day').format('YYYY-MM-DD'),
        checkinDate: moment().format('YYYY-MM-DD'),
        checkoutStatus: bookCondition,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        BookTigerId: bookTiger.id,
        UserAccountId: userAccount.id,
      });
      console.log('checkout created-----------------')
      console.log(checkoutCreated.dataValues)
      console.log('---------------------------------')
      res.status(200).send('checkout success')
    } else {
      if (!bookTiger.active)
        throw new Error('this book\'s condition is bad');
      else if (checkout)
        throw new Error('this book is unavailabe');
      else 
        throw new Error('this user is banned');
      console.log('---------------------------------')
      console.log('checkout failed')
      console.log('---------------------------------')
    }
  } catch (e) {
    next(e);
  }
}
router.post('/:bookTigerID?', checkout);
module.exports = router;
