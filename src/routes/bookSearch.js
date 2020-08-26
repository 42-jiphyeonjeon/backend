const express = require('express');
const { Op } = require('sequelize');
const { BookTiger, BookInfo } = require('../models');

const router = express.Router();

router.get('/search', (req, res) => {
  const searchWord = req.body.keyword;
  console.log(searchWord);
  BookTiger.findAll({
    order: [[BookTiger.associations.BookInfo, 'title', 'ASC']],
    include: [
      {
        model: BookInfo,
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchWord}%` } },
            { author: { [Op.like]: `%${searchWord}%` } },
          ],
        },
      },
    ],
  }).then((result) => { res.json(result); });
});

module.exports = router;
