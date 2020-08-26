module.exports.Log = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    'Log',
    {
      dueDate: {
        field: 'due_date',
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkinDate: {
        field: 'checkin_date',
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkoutStatus: {
        field: 'checkout_status',
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkinStatus: {
        field: 'checkin_status',
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'log',
    },
  );
  Log.associate = function associate(models) {
    Log.belongsTo(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    Log.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Log;
};
