module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('log', [{
    due_date: '2020-08-26',
    checkin_date: '2020-08-26',
    checkout_status: 'no harm(dachung)',
    checkin_status: 'no harm(ckang)',
    book_tiger_id: 1,
    user_account_id: 1,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    due_date: '2020-08-20',
    checkin_date: '2020-08-26',
    checkout_status: 'no harm(jbeen)',
    checkin_status: 'yes damage(jbeen)',
    book_tiger_id: 2,
    user_account_id: 2,
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('log'),
};
