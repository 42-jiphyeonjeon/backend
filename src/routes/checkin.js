const express = require('express');
const {
  BookTiger, BookInfo, Checkout, Log, UserStatus,
} = require('../models');

const router = express.Router();

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

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
  const { deactive, checkinStatus } = req.body;
  Checkout.findByPk(checkoutId).then((result) => {
    const now = new Date();
    const duedateMath = new Date(result.dueDate);
    const msDay = 60 * 60 * 24 * 1000;
    if (duedateMath < now) {
      const diff = Math.floor((now - duedateMath) / msDay);
      // console.log(now, now.addDays(diff));
      UserStatus.update({ banDate: now.addDays(diff) }, {
        where: { UserAccountId: result.UserAccountId },
      });
    }
    if (deactive) {
      console.log('book_tiger status update deactive');
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
      res.send('메인으로 이동');
    });
  });
});

module.exports = router;
