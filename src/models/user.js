module.exports.userAccount = (sequelize, DataTypes) => {
  const userAccount = sequelize.define(
    'UserAccount',
    {
      userName: {
        field: 'username',
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'user_account',
    },
  );
  userAccount.associate = function associate(models) {
    userAccount.hasMany(models.Checkout, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    models.UserAccount.hasMany(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'donator_id',
        allowNull: true,
      },
    });
    userAccount.belongsTo(models.UserInfo, {
      onDelete: 'cascade',
    });
    userAccount.hasOne(models.UserStatus, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return userAccount;
};

module.exports.userInfo = (sequelize, DataTypes) => {
  const userInfo = sequelize.define(
    'UserInfo',
    {
      phoneNumber: {
        field: 'phone_number',
        type: DataTypes.STRING(50),
        unique: true,
      },
      email: {
        field: 'email',
        type: DataTypes.STRING(50),
        unique: true,
      },
      imageUrl: {
        field: 'image_url',
        type: DataTypes.STRING(500),
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'user_info',
    },
  );
  userInfo.associate = function associate(models) {
    userInfo.hasOne(models.UserAccount, {
      onDelete: 'cascade',
    });
  }
  return userInfo;
};

module.exports.userStatus = (sequelize, DataTypes) => {
  const userStatus = sequelize.define(
    'UserStatus',
    {
      banDate: {
        field: 'ban_date',
        type: DataTypes.DATEONLY,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'user_status',
    },
  );
  userStatus.associate = function associate(models) {
    userStatus.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  }
  return userStatus;
};
