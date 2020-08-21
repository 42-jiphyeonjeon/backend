module.exports.UserAccount = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define(
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
  UserAccount.associate = function associate(models) {
    UserAccount.hasMany(models.Checkout, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    UserAccount.hasMany(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'donator_id',
        allowNull: true,
      },
    });
    UserAccount.belongsTo(models.UserInfo, {
      onDelete: 'cascade',
    });
    UserAccount.hasOne(models.UserStatus, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return UserAccount;
};

module.exports.UserInfo = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define(
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
  UserInfo.associate = function associate(models) {
    UserInfo.hasOne(models.UserAccount, {
      onDelete: 'cascade',
    });
  };
  return UserInfo;
};

module.exports.UserStatus = (sequelize, DataTypes) => {
  const UserStatus = sequelize.define(
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
  UserStatus.associate = function associate(models) {
    UserStatus.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return UserStatus;
};
