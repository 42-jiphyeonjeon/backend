'use strict';
module.exports.checkout = (sequelize, DataTypes) => {
  var checkout = sequelize.define('checkout', {
    dueDate: {
      field: "due_date",
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    checkinDate: {
      field: "checkin_date",
      type: DataTypes.DATEONLY
	},
	checkoutStatus: {
		field: "checkout_status",
		type: DataTypes.STRING,
		allowNull: false
	  },
	checkinStatus: {
		field: "checkin_status",
		type: DataTypes.STRING
	},
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: "checkout"
  });
  checkout.associate = function (models) {
    checkout.belongsTo(models.BookTiger, {
      onDelete: 'cascade',
      foreignKey: {
		  allowNull: false
	  },
	});
	checkout.belongsTo(models.UserAccount, {
		onDelete: 'cascade',
		foreignKey: {
		  allowNull: false,
		},	  
	});
  };
  return checkout;
};