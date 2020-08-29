const express = require('express');
const NotFound = require('../exceptions/NotFound');
const BadRequest = require('../exceptions/BadRequest');
const {
  Checkout, Log, UserStatus,
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
  const { active, checkinStatus } = req.body;
  Checkout.findByPk(checkoutId).then((result) => {
    if (!result) throw new NotFound('checkout is not found');
    const now = new Date();
    const duedateMath = new Date(result.dueDate);
    const msDay = 60 * 60 * 24 * 1000;
    if (duedateMath < now) {
      const diff = Math.floor((now - duedateMath) / msDay);
      now.setDate(now.getDate() + diff);
      UserStatus.update({ banDate: now }, {
        where: { UserAccountId: result.UserAccountId },
      })
        .catch((err) => {
          console.error(err);
        });
    }
    if (!active) {
      BookTiger.update({ active: 0 }, {
        where: { Id: result.BookTigerId },
      })
        .catch((err) => {
          console.error(err);
        });
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
      res.status(200);
    });
  }).catch((e) => {
    next(e);
  });
});

module.exports = router;
