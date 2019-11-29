/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('solutions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		day: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		startedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		finishedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		code: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'solutions'
	});
};
