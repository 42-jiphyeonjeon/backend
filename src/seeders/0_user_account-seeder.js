module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('user_account', [{
    username: 'jbeen',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    username: 'dachung',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('user_account'),
};
