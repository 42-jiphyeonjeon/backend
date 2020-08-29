module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('book_tiger', [{
    status: ' as ',
    book_info_id: 1,
    category_id: 1,
    identity_number: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 2,
    category_id: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 3,
    category_id: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 4,
    category_id: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 5,
    category_id: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 6,
    category_id: 2,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    status: ' as ',
    book_info_id: 1,
    category_id: 1,
    identity_number: 2,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('book_tiger'),
};
