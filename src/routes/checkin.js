const express = require('express');
const { BookTiger } = require('../models');

const router = express.Router();

router.get('/:bookTigerId', (req, res) => {
  const { bookTigerId } = req.params;
  console.log(bookTigerId);
  BookTiger.findByPk(bookTigerId, {
    include: [{ all: true }],
  }).then((result) => { res.json(result); });
});

module.exports = router;
