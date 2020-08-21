module.exports.Checkout = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    'Checkout',
    {
      dueDate: {
        field: 'due_date',
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkinDate: {
        field: 'checkin_date',
        type: DataTypes.DATEONLY,
      },
      checkoutStatus: {
        field: 'checkout_status',
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkinStatus: {
        field: 'checkin_status',
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'checkout',
    },
  );
  Checkout.associate = function associate(models) {
    Checkout.belongsTo(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    Checkout.belongsTo(models.UserAccount, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Checkout;
};
