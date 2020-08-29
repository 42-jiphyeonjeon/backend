module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('user_status', [{
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
    user_account_id: 1,
  }, {
    ban_date: '2020-8-30',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
    user_account_id: 2,
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('user_status'),
};
