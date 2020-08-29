const express = require('express');
const NotFound = require('../exceptions/NotFound');
const BadRequest = require('../exceptions/BadRequest');
const {
  Checkout, Log, UserStatus,
} = require('../models');

const router = express.Router();

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

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
      UserStatus.update({ banDate: now.addDays(diff) }, {
        where: { UserAccountId: result.UserAccountId },
      });
    }
    if (!active) {
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
      res.status(200);
    });
  }).catch((e) => {
    next(e);
  });
});

module.exports = router;
