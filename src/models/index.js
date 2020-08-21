const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
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

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === 'index.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.UserAccount = require('./user.js').UserAccount(sequelize, Sequelize);
db.UserInfo = require('./user.js').UserInfo(sequelize, Sequelize);
db.UserStatus = require('./user.js').UserStatus(sequelize, Sequelize);
db.BookInfo = require('./book.js').BookInfo(sequelize, Sequelize);
db.BookTiger = require('./book.js').BookTiger(sequelize, Sequelize);
db.Category = require('./book.js').Category(sequelize, Sequelize);
db.Checkout = require('./checkout.js').Checkout(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
