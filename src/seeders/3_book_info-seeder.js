module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('book_info', [{
    title: '해커와 화가',
    author: '김형선',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    title: '화가와 해커',
    author: '이준서',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    title: '이것이 해커다',
    author: '유형곤',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    title: '이것이 리눅스다',
    author: '김형선',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    title: '자바의 정석',
    author: '이준서',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }, {
    title: '해리포터',
    author: '조엔 k. 롤링',
    created_at: '2020-8-21',
    updated_at: '2020-8-21',
  }], {}),
  down: async (queryInterface) => queryInterface.dropTable('book_info'),
};
