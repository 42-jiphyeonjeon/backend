const express = require('express');
const NotFound = require('../exceptions/NotFound');
const BadRequest = require('../exceptions/BadRequest');
const {
  Checkout, Log, UserStatus, BookTiger,
} = require('../models');

const router = express.Router();

router.post('/:checkoutId', (req, res, next) => {
  const { checkoutId } = req.params;
  const { active, checkinStatus } = req.body;
  if (!checkoutId || active === undefined || !checkinStatus) throw new BadRequest('param or query is missing');
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
      res.status(200).send('Success');
    });
  }).catch((e) => {
    next(e);
  });
});

module.exports = router;
