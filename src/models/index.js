const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.UserAccount = require('./user.js').UserAccount(sequelize, Sequelize);
db.UserInfo = require('./user.js').UserInfo(sequelize, Sequelize);
db.UserStatus = require('./user.js').UserStatus(sequelize, Sequelize);
db.BookInfo = require('./book.js').BookInfo(sequelize, Sequelize);
db.BookTiger = require('./book.js').BookTiger(sequelize, Sequelize);
db.Category = require('./book.js').Category(sequelize, Sequelize);
db.Checkout = require('./checkout.js').Checkout(sequelize, Sequelize);
db.Log = require('./log.js').Log(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
