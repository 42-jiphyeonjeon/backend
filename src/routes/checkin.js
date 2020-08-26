const express = require('express');
const {
  BookTiger, BookInfo, Checkout, UserAccount,
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

module.exports = router;
