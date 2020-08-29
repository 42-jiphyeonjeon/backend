const express = require('express');
const { Op } = require('sequelize');
const {
  BookTiger, BookInfo, Checkout, UserAccount,
} = require('../models');
const NotFound = require('../exceptions/NotFound');

const router = express.Router();

function serializeBookTiger(bookTiger) {
  let { title } = bookTiger.BookInfo;
  if (bookTiger.identityNumber !== null) {
    title += ` #${bookTiger.identityNumber}`;
  }
  let checkout = null;
  if (bookTiger.Checkout !== null) {
    const overdueDay = parseInt((new Date() - new Date(bookTiger.Checkout.dueDate))
                                                      / (1000 * 60 * 60 * 24), 10);
    const user = {};
    user.userName = bookTiger.Checkout.UserAccount.userName;
    checkout = { id: bookTiger.Checkout.id, overdueDay, user };
  }
  return {
    id: bookTiger.id,
    title,
    author: bookTiger.BookInfo.author,
    active: bookTiger.active,
    status: bookTiger.status,
    checkout,
  };
}

function serializeBookTigerList(bookTigers) {
  return bookTigers.map(serializeBookTiger);
}

router.get('/search', (req, res) => {
  const resJson = { data: [], count: 0 };
  let searchWord = req.query.query;
  if (searchWord === undefined) {
    res.json(resJson);
    return;
  }
  searchWord = searchWord.trim();
  if (searchWord === '') {
    res.json(resJson);
    return;
  }
  BookTiger.findAndCountAll({
    order: [[BookTiger.associations.BookInfo, 'title', 'ASC']],
    attributes: ['id', 'identityNumber', 'active'],
    include: [
      {
        model: BookInfo,
        attributes: ['title', 'author'],
      },
      {
        model: Checkout,
        attributes: ['dueDate'],
        include: {
          model: UserAccount,
          attributes: ['userName'],
        },
      },
    ],
    where: {
      [Op.or]: [
        { '$BookInfo.title$': { [Op.like]: `%${searchWord}%` } },
        { '$BookInfo.author$': { [Op.like]: `%${searchWord}%` } },
        { '$Checkout.UserAccount.userName$': { [Op.like]: `%${searchWord}%` } },
      ],
    },
  }).then((result) => {
    resJson.data = serializeBookTigerList(result.rows);
    resJson.count = result.count;
    res.json(resJson);
  });
});

router.get('/overdue', (req, res) => {
  BookTiger.findAndCountAll({
    order: [[BookTiger.associations.Checkout, 'dueDate', 'ASC']],
    attributes: ['id', 'identityNumber'],
    include: [
      {
        model: BookInfo,
        attributes: ['title', 'author'],
      },
      {
        model: Checkout,
        attributes: ['dueDate'],
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        include: {
          model: UserAccount,
          attributes: ['userName'],
        },
      },
    ],
  }).then((result) => {
    res.json({
      data: serializeBookTigerList(result.rows),
      count: result.count,
    });
  });
});

router.get('/:bookId', (req, res, next) => {
  const resData = { data: [] };
  const { bookId } = req.params;
  BookTiger.findOne({
    attributes: ['id', 'identityNumber', 'active', 'status'],
    where: {
      id: bookId,
    },
    include: [
      {
        model: BookInfo,
        attributes: ['title', 'author'],
      },
      {
        model: Checkout,
        attributes: ['id', 'dueDate'],
        include: {
          model: UserAccount,
          attributes: ['userName'],
        },
      },
    ],
  }).then((bookTiger) => {
    if (bookTiger === null) {
      throw new NotFound('Bad pk');
    }
    resData.data = serializeBookTiger(bookTiger);
    res.json(resData);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
