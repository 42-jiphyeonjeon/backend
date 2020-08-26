module.exports.BookInfo = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define(
    'BookInfo',
    {
      title: {
        field: 'title',
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      author: {
        field: 'author',
        type: DataTypes.STRING(100),
      },
      publisher: {
        field: 'publisher',
        type: DataTypes.STRING(50),
      },
      isbn: {
        field: 'isbn',
        type: DataTypes.STRING(20),
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'book_info',
    },
  );
  BookInfo.associate = function associate(models) {
    models.BookInfo.hasMany(models.BookTiger, {
      onDelete: 'cascade',
    });
  };
  return BookInfo;
};

module.exports.BookTiger = (sequelize, DataTypes) => {
  const BookTiger = sequelize.define(
    'BookTiger',
    {
      callNumber: {
        field: 'call_number',
        type: DataTypes.STRING,
      },
      identityNumber: {
        field: 'identity_number',
        type: DataTypes.INTEGER,
      },
      active: {
        field: 'active',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        field: 'status',
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'book_tiger',
    },
  );
  BookTiger.associate = function associate(models) {
    BookTiger.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'donator_id',
        allowNull: true,
      },
    });
    BookTiger.belongsTo(models.BookInfo, {
      onDelete: 'cascade',
    });
    BookTiger.belongsTo(models.Category, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    BookTiger.hasOne(models.Checkout, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    BookTiger.hasMany(models.Log, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return BookTiger;
};

module.exports.Category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        field: 'name',
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'category',
    },
  );
  Category.associate = function associate(models) {
    Category.hasMany(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Category;
};
