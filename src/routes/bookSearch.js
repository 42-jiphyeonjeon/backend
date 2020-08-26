const express = require('express');
const { Op } = require('sequelize');
const { BookTiger, BookInfo, Checkout } = require('../models');

const router = express.Router();

function serializeBookTigers(bookTigers) {
  return bookTigers.map((bookTiger) => {
    let { title } = bookTiger.BookInfo;
    if (bookTiger.identityNumber !== null) {
      title += ` #${bookTiger.identityNumber}`;
    }
    let checkout = null;
    if (bookTiger.Checkout !== null) {
      checkout = {};
      const now = new Date();
      const dueDate = new Date(bookTiger.Checkout.dueDate);
      checkout.overdueDay = parseInt((now - dueDate) / (1000 * 60 * 60 * 24), 10);
    }
    return {
      id: bookTiger.id,
      title,
      author: bookTiger.BookInfo.author,
      checkout,
    };
  });
}

router.get('/search', (req, res) => {
  const resData = { data: [], count: 0 };
  let searchWord = req.query.query;
  if (searchWord === undefined) {
    res.json(resData);
    return;
  }
  searchWord = searchWord.trim();
  if (searchWord === '') {
    res.json(resData);
    return;
  }
  BookTiger.findAndCountAll({
    order: [[BookTiger.associations.BookInfo, 'title', 'ASC']],
    attributes: ['id', 'identityNumber'],
    include: [
      {
        model: BookInfo,
        attributes: ['title', 'author'],
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchWord}%` } },
            { author: { [Op.like]: `%${searchWord}%` } },
          ],
        },
      },
      {
        model: Checkout,
        attributes: ['dueDate'],
      },
    ],
  }).then((result) => {
    resData.data = serializeBookTigers(result.rows);
    resData.count = result.count;
    res.json(resData);
  });
});

module.exports = router;
