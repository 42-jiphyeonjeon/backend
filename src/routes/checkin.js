const express = require('express');
const {
  BookTiger, BookInfo, Checkout, UserAccount, Log,
} = require('../models');

const router = express.Router();

router.get('/:checkoutId', (req, res) => {
  const { checkoutId } = req.params;
  Checkout.findByPk(checkoutId, {
    include: [{ all: true }, { model: BookTiger, include: [BookInfo] }],
  }).then((result) => { res.json(result); });
});

// router.get('/:bookTigerId', (req, res) => {
//   const { bookTigerId } = req.params;
//   BookTiger.findByPk(bookTigerId, {
//     include: [BookInfo, { model: Checkout, include: [UserAccount] }],
//   }).then((result) => { res.json(result); });
// });

router.post('/:checkoutId', (req, res) => {
  const { checkoutId } = req.params;
  const { checkinStatus } = req.body;
  Checkout.findByPk(checkoutId).then((result) => {
    const now = new Date();
    if (result.dueDate < now) {
      console.log('user_status ban_date update');
    }
    Log.create({
      dueDate: result.dueDate,
      checkinDate: now,
      checkoutStatus: result.checkoutStatus,
      checkinStatus,
      UserAccountId: result.UserAccountId,
      BookTigerId: result.BookTigerId,
    }).then(() => {
      Checkout.destroy({ where: { id: checkoutId } });
    }).then(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
