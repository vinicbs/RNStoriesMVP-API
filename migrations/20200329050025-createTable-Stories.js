'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {
	db.createTable('stories', {
		id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			foreignKey: {
				name: 'users_users_id_fk',
				table: 'users',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: {
					user_id: 'id'
				}
			}
		},
		media: {
			type: 'string',
			notNull: true,
			length: 500
		},
		updated_at: {
			type: 'timestamp',
			notNull: true,
			defaultValue: new String('CURRENT_TIMESTAMP')
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			defaultValue: new String('CURRENT_TIMESTAMP')
		}
	});
	return null;
};

exports.down = function (db) {
	db.dropTable('stories');
	return null;
};

exports._meta = {
	"version": 1
};
