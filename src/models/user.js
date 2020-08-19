module.exports.userAccount = function(sequelize, DataTypes){
	let userAccount = sequelize.define("UserAccount", {
		userName: {
			field: "username",
			type: DataTypes.STRING(50),
			unique: true,
			allowNull: false
		},
	}, {
		underscored: true,
		freezeTableName: true,
		tableName: "user_account"
	});
	userAccount.associate = function (models) {
		models.UserAccount.hasOne(models.UserInfo, {
			onDelete: 'cascade',
		});
		models.UserAccount.hasOne(models.UserStatus, {
			onDelete: 'cascade',
		});
	};
	return userAccount;
};

module.exports.userInfo = function(sequelize, DataTypes){
	let userInfo = sequelize.define("UserInfo", {
		phoneNumber: {
			field: "phone_number",
			type: DataTypes.STRING(50),
			unique: true,
			allowNull: false
		},
		email: {
			field: "email",
			type: DataTypes.STRING(50),
			unique: true,
			allowNull: false
		},
		imageUrl: {
			field: "image_url",
			type: DataTypes.STRING(500),
			allowNull: false
		}
	}, {
		underscored: true,
		freezeTableName: true,
		tableName: "user_info"
	});
	return userInfo;
};

module.exports.userStatus = function(sequelize, DataTypes){
	let userStatus = sequelize.define("UserStatus", {
		banDate: {
			field: "ban_date",
			type: DataTypes.DATEONLY,
			unique: true,
			allowNull: false
		},
	}, {
		underscored: true,
		freezeTableName: true,
		tableName: "user_status"
	});
	return userStatus;
};
