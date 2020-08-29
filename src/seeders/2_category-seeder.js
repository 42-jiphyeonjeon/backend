module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('category', [{
    name: '컴퓨터 공학',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    name: '소설',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('category'),
};
