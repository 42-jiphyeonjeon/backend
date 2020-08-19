'use strict';

module.exports.bookInfo = (sequelize, DataTypes) => {
  var bookInfo = sequelize.define('bookInfo', {
    title: {
      field: "title",
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      field: "author",
      type: DataTypes.STRING(100),
    },
    publisher: {
      field: "publisher",
      type: DataTypes.STRING(50),
    },
    isbn: {
      field: "isbn",
      type: DataTypes.STRING(20)
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: "book_info"
  });
  bookInfo.associate = function (models) {
    models.BookInfo.hasOne(models.BookTiger, {
      onDelete: 'cascade',
    });
  };
  return bookInfo;
};

module.exports.bookTiger = (sequelize, DataTypes) => {
  var bookTiger = sequelize.define('bookTiger', {
    category: {
      field: "category",
      type: DataTypes.STRING(50),
      allowNull: false
    },
    callNumber: {
      field: "call_number",
      type: DataTypes.STRING
    },
    active : {
      field: "active",
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      field: "status",
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: "book_tiger"
  });
  bookTiger.associate = function (models) {
    bookTiger.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
		name: 'donator_id',
        allowNull: true,
      },
    });
  };
  return bookTiger;
};

module.exports.category = (sequelize, DataTypes) => {
    var category = sequelize.define('category', {
      name: {
        field: "name",
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "category"
    });
    category.associate = function (models) {
      category.hasOne(models.BookTiger, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return category;
};