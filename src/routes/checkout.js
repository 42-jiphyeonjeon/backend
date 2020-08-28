const express = require('express');
const {
  BookTiger, BookInfo, Checkout, UserAccount,
} = require('../models');
const NotFound = require('../exceptions/NotFound');

const router = express.Router();

function serializeCheckout(checkout) {
  const overdueDay = parseInt((new Date() - new Date(checkout.dueDate))
                                            / (1000 * 60 * 60 * 24), 10);
  let { title } = checkout.BookTiger.BookInfo;
  if (checkout.BookTiger.identityNumber !== null) {
    title += ` #${checkout.BookTiger.identityNumber}`;
  }
  const user = {};
  user.userName = checkout.UserAccount.userName;
  const book = {};
  book.title = title;
  return {
    id: checkout.id,
    overdueDay,
    checkoutStatus: checkout.checkoutStatus,
    user,
    book,
  };
}

router.get('/:checkoutId', (req, res, next) => {
  const { checkoutId } = req.params;
  const resData = { data: [] };
  Checkout.findOne({
    attributes: ['id', 'dueDate', 'checkoutStatus'],
    where: {
      id: checkoutId,
    },
    include: [
      {
        model: BookTiger,
        attributes: ['id', 'identityNumber'],
        include: {
          model: BookInfo,
          attributes: ['title', 'author'],
        },
      },
      {
        model: UserAccount,
        attributes: ['userName'],
      },
    ],
  }).then((checkout) => {
    if (checkout === null) {
      throw new NotFound('Bad pk');
    }
    resData.data = serializeCheckout(checkout);
    res.json(resData);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
